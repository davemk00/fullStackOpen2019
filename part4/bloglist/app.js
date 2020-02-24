const config = require('./utils/config') 
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

const mongoUrl = config.MONGODB_URI
console.log('connecting to:: ', mongoUrl)

mongoose.connect(mongoUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())

app.use('/', blogsRouter)

app.use(middleware.unknownEndpoint)

module.exports = app
