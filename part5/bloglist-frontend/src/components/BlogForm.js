import React, {useState} from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogURL, setNewBlogURL] = useState('')


  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogURL,
    })
    
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogURL('')
  }


  return (
    <form onSubmit={addBlog}>
      <h3>New blog:</h3>
      <div className="blogEntry">
        Title: <input
          className="entry"
          value={newBlogTitle}
          onChange={event => setNewBlogTitle(event.target.value)}
        />
        <br></br>
    Author: <input
          className="entry"
          value={newBlogAuthor}
          onChange={event => setNewBlogAuthor(event.target.value)}
        />
        <br></br>
    URL: <input
          className="entry"
          value={newBlogURL}
          onChange={event => setNewBlogURL(event.target.value)}
        />
        <br></br>
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}

export default BlogForm
