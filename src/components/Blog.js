import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, showRemoveButton, handleLike, handleRemove }) => {
  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    showRemoveButton: PropTypes.bool.isRequired,
    handleLike: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired
  }

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

  const removeButtonStyle = { display: showRemoveButton ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <div onClick={toggleShowFullBlog} id='blogTitleAndAuthor'>{blog.title} {blog.author}</div>
      <div id='blogAdditionalDetails' style={fullBlogStyle}>
        <div id='blogUrl'>{blog.url}</div>
        <div id='blogLikes'>{blog.likes} likes <button onClick={handleLike}>like</button></div>
        <div id='blogAddedBy'>added by {blog.user.name}</div>
        <div style={removeButtonStyle}>
          <button onClick={handleRemove}>remove</button>
        </div>
      </div>
    </div>
  )}

export default Blog