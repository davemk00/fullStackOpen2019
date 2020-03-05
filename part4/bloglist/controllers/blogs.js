const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  response.send(`<h1>DK bloglist</h1>
  <p>Use</p>
  <p>/api/blogs</p>`)
})

blogsRouter.get('/api/blogs', async (request, response) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs.map (blog => blog.toJSON()))
  } catch(exception) {
    console.log(exception)
  }
})

blogsRouter.post('/api/blogs', async (request, response) => {
  const blog = new Blog(request.body)

  try {
    const savedBlog = await blog.save()
    response.json(savedBlog.toJSON())
  } catch(exception) {
    console.log(exception)
  }
})


module.exports = blogsRouter