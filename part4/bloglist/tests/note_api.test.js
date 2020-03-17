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


test('If likes are missing, default to zero', async () => {
  const withoutLikes = {
    title: 'this is a blog without a like',
    author: 'it\'s a test',
    url: 'What\'s a URL?',
  }
  
  const res = await api
    .post('/api/blogs')
    .send(withoutLikes)
    .expect(201)
  expect(res.body.likes).toBe(0)
})


test('Title and Url through 400 error', async () => {
  const withoutTitle = {
    author: "it's a test",
    url: "What's a URL?",
    likes: 12,
  }

  const withoutUrl = {
    title: "this is a blog without a like",
    author: "it's a test",
    likes: 12,
  }
  
  const res1 = await api
    .post('/api/blogs')
    .send(withoutTitle)
    .expect(400)
  console.log(res1.status)
  
  const res2 = await api
    .post('/api/blogs')
    .send(withoutUrl)
    .expect(400)
  console.log(res2.status)
})

afterAll(() => {
  mongoose.connection.close()
})

