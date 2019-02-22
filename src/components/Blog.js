import React, { useState } from 'react'

const Blog = ({ blog, handleLike }) => {
  const blogStyle = {
    border: '2px solid #ce6204',
    borderRadius: '5px',
    padding: '10px',
    marginTop: '5px',
    marginBottom: '5px',
    background: '#fcf5db'
  }

  const [ showFullBlog, setShowFullBlog ] = useState(false)

  const toggleShowFullBlog = () => {
    setShowFullBlog(!showFullBlog)
  }

  const fullBlogStyle = { display: showFullBlog ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <div onClick={toggleShowFullBlog}>{blog.title} {blog.author}</div>
      <div style={fullBlogStyle}>
        <div>{blog.url}</div>
        <div>{blog.likes} likes <button onClick={handleLike}>like</button></div>
        <div>added by {blog.user.name}</div>
      </div>
    </div>
)}

export default Blog