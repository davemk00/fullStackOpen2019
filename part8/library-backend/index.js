const { ApolloServer, gql, UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
require('dotenv').config()
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const pubsub = new PubSub()

const JWT_SECRET = process.env.JWT_SECRET
const MONGODB_URI = process.env.PART8_MONGODB_URI

console.log('connecting to', MONGODB_URI) 

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  } 
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
  type Subscription {
    bookAdded: Book!
    authorAdded: Author!
    authorEdited: Author!
  }
`

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),

    bookCount: () => Book.collection.countDocuments(),

    allAuthors: () => Author.find({}),

    allBooks: async (root, args) => {
      const author = await Author.findOne({ name:args.author })
      const genre = args.genre

      console.log({genre})

      // I tried to find a smarter way to filter serverside, but gave up....\
      if (!args.author && !args.genre) {
        return Book.find({}).populate('author')
      }      
      
      if (!args.author && args.genre) {
        return Book.find({genres:genre}).populate('author')
      }
      
      if (args.author && !args.genre) {
        return Book.find({author:author}).populate('author')
      }
      
      if (args.author && args.genre) {
        return Book.find({genres:genre, author:author}).populate('author')
      }
      
    },

    me: (root, args, context) => {
      return context.currentUser
    }
  },
  
  Mutation: {
    addBook: async (root, args, context) => {
      let author = await Author.findOne({ name:args.author })
      const currentUser = context.currentUser
      
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      
      if (author === null) {
        console.log("saving new author")
        author = new Author({ name: args.author })
        
        try {
          await author.save()
          pubsub.publish("AUTHOR_ADDED", { authorAdded: author })
        } catch (error) {
          console.log(`Add Author error::  ${error.message}`)
          // throw new UserInputError(error.message, {
          //   invalidArgs: args,
          // })
        }
        
        
      } else {
        console.log("author found")
      }

      let book = await Book.findOne({ title:args.title }).populate('author')
      if (book === null) {
        console.log("saving new book")        
        book = new Book({ ...args, author: author })
        try {
          await book.save()
          pubsub.publish("BOOK_ADDED", { bookAdded: book })
          
        } catch (error) {
          console.log('error throw 2')
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        
        
      } else {
        console.log("book found")
      }
      
      return book
      
    },
    
    
    editAuthor: async (root, args, context) => {      
      const currentUser = context.currentUser
      console.log(args)
      
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      
      const author = await Author.findOne({ name:args.name }) 
      
      try {
        author.born = args.setBornTo
        await author.save()
        pubsub.publish("AUTHOR_EDITED", { authorAdded: author })
      } catch (error) {
        console.log('Error editing Author year born')
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      } 
      
      return author
    },
    
    createUser: async (root, args) => {
      const user = new User({ username: args.username })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args, 
        })
      })
    },


    login: async (root, args) =>{
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'shhh' ) {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },

  Subscription: {
    bookAdded: { subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]) },
    authorAdded: { subscribe: () => pubsub.asyncIterator(["AUTHOR_ADDED"]) },
    authorEdited: { subscribe: () => pubsub.asyncIterator(["AUTHOR_EDITED"]) },
  },
}

const server = new ApolloServer({
  typeDefs, 
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await (await User.findById(decodedToken.id))
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})