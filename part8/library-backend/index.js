const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
require('dotenv').config()
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

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
      born: Int!
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
`

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),

    bookCount: () => Book.collection.countDocuments(),

    allAuthors: () => Author.find({}),

    allBooks: async (root, args) => {
      if (!args.author) {
        return Book.find({}).populate('author')
      }
      const author = await Author.findOne({ name:args.author })
      return Book.find({author:author}).populate('author')
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
        } catch (error) {
          console.log('error throw 1')
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
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
    
    
    editAuthor: async (root, args) => {      
      const currentUser = context.currentUser
      
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      
      try {
        const author = await Author.findOne({ name:args.name }) 
        author.born = args.born
        await author.save()
      } catch (error) {
        console.log('error throw 3')
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
  }
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

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})