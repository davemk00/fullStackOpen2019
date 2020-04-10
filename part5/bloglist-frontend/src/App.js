import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
// import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogURL, setNewBlogURL] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      //noteService.setToken(user.token)
    }
  }, [])

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('logging out')
    try {
      window.localStorage.removeItem('loggedNoteappUser')

      blogService.setToken('user.token')
      setUser(null)
      setUsername('')
      setPassword('')
      console.log('user logged out')
    } catch (exception) {
      console.log('not logged out')
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      // setErrorMessage('Wrong credentials')
      console.log('Wrong credentials')
      setTimeout(() => {
        // setErrorMessage(null)
        console.log(null) 
      }, 5000)
    }
  }
 
  const logoutForm = () => (
    <form onSubmit={ handleLogout }>
      <div>
        <div>
          { user.name } logged in  
          <button type="submit">logout</button>
        </div>
      </div>
    </form>     
  )

  const loginForm = () => (
    <form onSubmit={ handleLogin }>
      <div>
        <h2>Log in: </h2>
        username 
        <input
        type="text"
        value={ username }
        name="Username"            
        onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={ password }
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <div>
      <h2>Blogs: </h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const newBlogForm = () => (
    <form onSubmit={addBlog}>
      <h3>New blog:</h3>
      <div className = "blogEntry">
        Title: <input
          value={newBlogTitle}
          onChange={event => setNewBlogTitle(event.target.value)}
          />
          <br></br>
        Author: <input
          value={newBlogAuthor}
          onChange={event => setNewBlogAuthor(event.target.value)}
          />
          <br></br>
        URL: <input
          value={newBlogURL}
          onChange={event => setNewBlogURL(event.target.value)}
          />
          <br></br>
        <button type="submit">Submit</button>
      </div>
    </form>
  )
  
  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: 'testURL',
      likes: 69,
    }
  
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlogTitle('')
        setNewBlogAuthor('')
        setNewBlogURL('')
      })
  }



  return (
    <div>
      <h1>Blogs</h1>

      {user === null ?
        loginForm() : 
        <div>
          {logoutForm()}
          {blogForm()}
          {newBlogForm()}
        </div>
      }
    </div>
  )
}

export default App