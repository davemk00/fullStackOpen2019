const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')


const MONGODB_URI = 'mongodb+srv://dbUser:Dr0Pqn63vofEt6oZ@cluster0.xs4tv.mongodb.net/FSO_part8?retryWrites=true&w=majority'

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
  }
`

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),

    bookCount: () => Book.collection.countDocuments(),

    allAuthors: () => Author.find({}),

    allBooks: (root, args) => {
      return Book.find({}).populate('author')
    }
  },
  
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name:args.author })
      
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



      
      let book = await Book.findOne({ title:args.title })
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
    editAuthor: (root, args) => {
      const author = authors.find(p => p.name === args.name)
      if (!author) {
        return null
      }

      const updatedAuthor = { ...author, born: args.born }
      authors = authors.map(p => p.name === args.name ? updatedAuthor : p)
      return updatedAuthor
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})