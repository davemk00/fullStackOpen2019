import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({
  blog,
  handleRemove,
  showRemoveButton,
}) => {
  const [likes, setLikes] = useState(blog.likes)
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

  const updateLikes = async (blog) => {
    ++blog.likes
    const response = await blogService.update(blog.id, blog)
    setLikes(response.likes)
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
        {likes} likes
        <button onClick={() => updateLikes(blog)}>Like</button>
        <br />
        {blog.author}
        <br />
        {showRemoveButton && <button onClick={handleRemove}>Remove</button>}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleRemove: PropTypes.func.isRequired,
  showRemoveButton: PropTypes.bool.isRequired
}

export default Blog
