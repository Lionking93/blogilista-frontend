import React from 'react'
import PropTypes from 'prop-types'

const NewBlog = ({ handleAddBlog, title, author, url }) => {
  NewBlog.propTypes = {
    handleAddBlog: PropTypes.func.isRequired,
    title: PropTypes.object.isRequired,
    author: PropTypes.object.isRequired,
    url: PropTypes.object.isRequired
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleAddBlog}>
        <div>
          <label htmlFor='blogTitle'>Title: </label>
          <input {...title.inputProps} id='blogTitle' />
        </div>
        <div>
          <label htmlFor='blogAuthor'>Author: </label>
          <input {...author.inputProps} id='blogAuthor' />
        </div>
        <div>
          <label htmlFor='blogUrl'>Url: </label>
          <input {...url.inputProps} id='blogUrl' />
        </div>
        <input type='submit' value='Create' />
      </form>
    </div>
  )}

export default NewBlog