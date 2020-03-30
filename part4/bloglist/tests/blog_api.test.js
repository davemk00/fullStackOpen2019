const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)
const Blog = require('../models/blog')

describe('when there is initially some blogs saved', () => {
  beforeEach( async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
      .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)

    /*for (let blog of helper.initialBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    } */
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('SIX blogs are returned', async () => {
    const res = await api
      .get('/api/blogs')
      .expect(200)
    expect(res.body.length).toBe(6)
  })
  
  test('The unique identifier is id, not _id', async () => {
    const res = await api
      .get('/api/blogs')
      .expect(200)
    expect(res.body[0].id).toBeDefined()
  })
    
  describe('viewing a specific blog', () => {
    test('succeeds with comparison of body', async () => {
      const blogsAtStart = await helper.blogsInDb()  
      const blogToView = blogsAtStart[0]
      
      const resultBlog = await api    
        .get(`/api/blogs/${blogToView.id}`)    
        .expect(200)    
        .expect('Content-Type', /application\/json/)
      expect(resultBlog.body).toEqual(blogToView)
    })

    test('fails with statuscode 404 if blog does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api
        .get(`/api/blogs/${validNonexistingId}`)
        .expect(404)
    })

    test('fails with statuscode 400 when id is invalid', async () => {
      const invalidId = '5a422a851b54a676234d'

      await api
        .get(`/api/blogs/${invalidId}`)
        .expect(400)
    })
  })

  describe('addition of a new blog', () => {
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
  
    test('wihtout Title and Url throw 400 error', async () => {
      const withoutTitleOrUrl = {
        author: 'it\'s a test',
        likes: 12,
      }
      
      await api
        .post('/api/blogs')
        .send(withoutTitleOrUrl)
        .expect(400)
    })
  })
})


describe('Deletion of a Blog', () => {
  test('Succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
  
    await api    
      .delete(`/api/blogs/${blogToDelete.id}`)    
      .expect(204)
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd.length).toBe(
      blogsAtStart.length - 1
    )
  
    const contents = blogsAtEnd.map(r => r.content)
    expect(contents).not.toContain(blogToDelete.id)
  })
})

describe('Updating a Blog', () => {
  test('Succeeds by testing likes are increased by 1', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const initLikes = blogToUpdate.likes
    blogToUpdate.likes = blogToUpdate.likes + 1
    
    await api    
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)


    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].likes).toEqual(initLikes + 1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})

