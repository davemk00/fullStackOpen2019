import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [blogDetailsVisible, setBlogDetailsVisible] = useState(false)
  const hideWhenVisible = { display: blogDetailsVisible ? 'none' : '' }
  const showWhenVisible = { display: blogDetailsVisible ? '' : 'none' }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
      <b>{blog.title}</b> {blog.author}
        <button onClick={() => setBlogDetailsVisible(true)}>show</button>
      </div>
      <div style={showWhenVisible}>
        <b>{blog.title}</b>
        <button onClick={() => setBlogDetailsVisible(false)}>hide</button>
        <br/>
        {blog.url}
        <br />
        {blog.likes}
        <br />
        {blog.author}
      </div>
    </div>
  )
}

export default Blog
