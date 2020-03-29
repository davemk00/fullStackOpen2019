const usersRouter = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')
const bcrypt = require('bcrypt')

usersRouter.get('/api/users', async (request, response) => {
  const users = await User.find({})
  response.json(users.map (user => user.toJSON()))
  logger.info('Users returned successully')
})


usersRouter.post('/api/users', async (request, response) => {
  const body = request.body
  
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  if ( user.name === undefined || body.password === undefined ) {
    const errStr = 'Name or password missing - must have value'
    logger.error(errStr)
    return response.status(400).json({ error: errStr })
  }

  if ( body.password.length < 3 || body.username.length < 3 ) {
    const errStr = 'Password and/or username too short - must be at least three letters long'
    logger.error(errStr)
    return response.status(400).json({ error: errStr })
  }

  const users = await User.find({})

  // look at each username and test match
  // Would be better to use map instead of a loop
  users.forEach(e => {
    var exUserName = e.username
    if (exUserName.toLowerCase() === body.username.toLowerCase()){
      const errStr = 'Username not available - try another username'
      logger.error(errStr)
      return response.status(400).json({ error: errStr })
    }
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter