import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
// import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

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
    console.log('logging in with', username, password)
  }
 
  const loginForm = () => (
    <form onSubmit={handleLogin}>        
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
  
  return (
    <div>
      <h1>Blogs</h1>

      {user === null ?
        loginForm() : 
        <div>
          <p>{ user.name } logged in</p>
          <div>
            <h2>Blogs: </h2>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
              )}
          </div>
        </div>
      }
    </div>
  )
}

export default App