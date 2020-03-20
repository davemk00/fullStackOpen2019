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
  } 
  catch(exception) {
    console.log(exception)
  }
})


blogsRouter.get('/api/blogs/:id', async (request, response) => {
  const id = request.params.id
  try {
    const blog = await Blog.findById(id)
    if (blog) {
      response.status(200).json(blog.toJSON())
    } 
    else {
      response.status(404).end()
    }
  } 
  catch(exception) {
    if (exception.name === 'CastError') {
      return response.status(400).json({ error: 'Invalid ID' })
    }
    return response.status(400).json({ error: 'Bad request' })
  }
})

blogsRouter.post('/api/blogs', async (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: (body.likes)? body.likes: 0,
  })

  if ( blog.title === undefined && blog.url === undefined) {
    return response.status(400).json({error: 'Title and url are empty - must have values'})
  }

  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog.toJSON())
  } 
  catch(exception) {
    console.log(exception)
  }
})


blogsRouter.delete('/api/blogs/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } 
  catch(exception) {
    console.log(exception)
  }
})


blogsRouter.put('/api/blogs/:id', async (request, response, next) => {
  const { title, author, url, likes } = request.body
  const blog = { title, author, url, likes }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.json(updatedBlog.toJSON())
  } 
  catch (exception) { 
    next(exception)
  }
})


module.exports = blogsRouter