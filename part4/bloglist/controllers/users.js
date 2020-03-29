const usersRouter = require('express').Router()
const User = require('../models/user')
require('express-async-errors')
const logger = require('../utils/logger')
const bcrypt = require('bcrypt')

usersRouter.get('/api/users', async (request, response) => {
  const users = await User.find({})
  response.json(users.map (user => user.toJSON()))
  logger.info('Users returned successully')
})


usersRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter