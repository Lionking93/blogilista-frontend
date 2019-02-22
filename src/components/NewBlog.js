import React from 'react'
import PropTypes from 'prop-types'

const NewBlog = ({ handleAddBlog, setTitle, setAuthor, setUrl }) => {
  NewBlog.propTypes = {
    handleAddBlog: PropTypes.func.isRequired,
    setTitle: PropTypes.func.isRequired,
    setAuthor: PropTypes.func.isRequired,
    setUrl: PropTypes.func.isRequired
  }
  
  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleAddBlog}>
        <div>
          <label htmlFor='blogTitle'>Title: </label>
          <input onChange={({target}) => setTitle(target.value)} id='blogTitle' type='text' />
        </div>
        <div>
          <label htmlFor='blogAuthor'>Author: </label>
          <input onChange={({target}) => setAuthor(target.value)} id='blogAuthor' type='text' />
        </div>
        <div>
          <label htmlFor='blogUrl'>Url: </label>
          <input onChange={({target}) => setUrl(target.value)} id='blogUrl' type='text' />
        </div>
        <input type='submit' value='Create' />
      </form>
    </div>
)}

export default NewBlog