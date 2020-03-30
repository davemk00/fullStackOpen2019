const config = require('./utils/config') 
const express = require('express')
require('express-async-errors')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const logger = require('./utils/logger')

const mongoUrl = config.MONGODB_URI
logger.info('connecting to:: ', mongoUrl)

mongoose.connect(mongoUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
})
  .then(() => {
    logger.info('connected to:: ', mongoUrl)
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())

app.use('/', blogsRouter)
app.use('/', loginRouter)
app.use('/', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
