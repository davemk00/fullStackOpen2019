const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
  const res = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('FOUR blogs are returned', async () => {
  const res = await api
    .get('/api/blogs')
    .expect(200)
  expect(res.body.length).toBe(4)
})
  
afterAll(() => {
  mongoose.connection.close()
})
