import React, { useState } from 'react'
import blogService from '../services/blogs'

const NewBlog = ({ setInfoMessage, blogs, setBlogs }) => {
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl] = useState('')
  
  const handleAddBlog = async (event) => {
    event.preventDefault()

    console.log('Add new blog with following info', title, author, url)
    setTitle('')
    setAuthor('')
    setUrl('')

    try {
      const newBlog = await blogService.addNewBlog({ title, author, url })
      setInfoMessage(`A new blog ${newBlog.title} added`)
      setTimeout(() => {
        setInfoMessage(null)
      }, 5000)
      setBlogs(blogs.concat(newBlog))
    } catch (error) {
      console.log(error.response.data.error)
    }
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