import React, { useState, useEffect } from 'react'

import LoginForm from './components/Login'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogURL, setNewBlogURL] = useState('')

  const [loginVisible, setLoginVisible] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)

  const blogFormRef = React.createRef()
  
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
      blogService.setToken(user.token)
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
      setInfoMessage(`${username} Logged in`)
      setTimeout(() => {
        setInfoMessage(null)
        console.log(null) 
      }, 5000)
    } catch (exception) {
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
        // console.log(null) 
      }, 5000)
    }
  }
 
  const logoutForm = () => (
    <form onSubmit={ handleLogout }>
      <div>
        <div>
          { user.name } logged in.
          <button type="submit" onClick={() => setLoginVisible(false)}>logout</button>
        </div>
      </div>
    </form>     
  )

  // const loginForm = () => (
  //   <Togglable buttonLabel='login'>
  //     <LoginForm
  //       username={username}
  //       password={password}
  //       handleUsernameChange={({ target }) => setUsername(target.value)}
  //       handlePasswordChange={({ target }) => setPassword(target.value)}
  //       handleSubmit={handleLogin}
  //     />
  //   </Togglable>
  // )

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }
    
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleLogin={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const blogForm = () => (
    <div>
      <h3>Blogs: </h3>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const newBlogForm = () => (
    <Togglable buttonLabel='new note' ref={blogFormRef}>    
      <form onSubmit={addBlog}>
        <h3>New blog:</h3>
        <div className = "blogEntry">
          Title: <input
            className = "entry"
            value={newBlogTitle}
            onChange={event => setNewBlogTitle(event.target.value)}
            />
            <br></br>
          Author: <input
            className = "entry"
            value={newBlogAuthor}
            onChange={event => setNewBlogAuthor(event.target.value)}
            />
            <br></br>
          URL: <input
            className = "entry"
            value={newBlogURL}
            onChange={event => setNewBlogURL(event.target.value)}
            />
            <br></br>
          <button type="submit">Submit</button>
        </div>
      </form>
    </Togglable>
  )
  
  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogURL,
    }
    
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlogTitle('')
        setNewBlogAuthor('')
        setNewBlogURL('')
        setInfoMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} has been added`)
        setTimeout(() => {
        setInfoMessage(null)
          console.log(null) 
        }, 5000)
      })
  }



  return (
    <div>
      <h1>Blogs</h1>

      <Notification message={ errorMessage } type={ 'error' } />
      <Notification message={ infoMessage } type={ 'info' } />

      {user === null ?
        <div>
          {loginForm()}
          {blogForm()}
        </div> : 
        <div>
          {logoutForm()}
          {newBlogForm()}
          {blogForm()}
        </div>
      }
    </div>
  )
}

export default App