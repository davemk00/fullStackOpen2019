const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
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

test('The unique identifier is id, not _id', async () => {
  const res = await api
    .get('/api/blogs')
    .expect(200)
  expect(res.body[0].id).toBeDefined()
})


test('HTTP POST a valid blog can be added through  request to /api/blogs increases blog count by one', async () => {
  const initialBlogs = await api.get('/api/blogs')

  const newBlog = {
    title: Math.random().toString(36).substring(7),
    author: Math.random().toString(36).substring(7),
    url: 'A dummy URL for testing',
   // url: 'Some URL',
    likes: Math.random()*10,
  }  

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const finalBlogs = await api.get('/api/blogs')
  expect(finalBlogs.body.length).toBe(initialBlogs.body.length + 1)

  const contents = finalBlogs.body.map(r => r.url)
  expect(contents).toContain('A dummy URL for testing')
})


afterAll(() => {
  mongoose.connection.close()
})

