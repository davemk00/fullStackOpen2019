import React from 'react'

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <div>
      <h2>Log in: </h2>
      
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            className="entry"
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            className="entry"
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm