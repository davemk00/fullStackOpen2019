const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
require('express-async-errors')
const api = supertest(app)
const User = require('../models/user')

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})    
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ 
      username: 'root', 
      name: 'root Name', 
      passwordHash 
    })
    await user.save()
  })

  test('database returns just one user', async () => {
    const usersAtStart = await helper.usersInDb()

    expect(usersAtStart.length).toBe(1)
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'dking',
      name: 'David King',
      password: 'password123',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})