import React, { useState, useEffect } from 'react'
import NewBlog from './components/NewBlog'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import { useField } from './hooks/index'

const errorStyle = {
  border: '2px solid red',
  borderRadius: '5px',
  background: '#e8eae9',
  padding: '5px',
  color: 'red',
  fontFamily: 'Comic Sans MS',
  display: 'inline-block'
}

const infoStyle = {
  ...errorStyle,
  border: '2px solid green',
  color: 'green'
}


const App = () => {
  const [blogs, setBlogs] = useState([])
  const username = useField('text')
  const password = useField('text')
  const [errorMessage, setErrorMessage] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)
  const [user, setUser] = useState(null)
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInBloglistUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((b1, b2) => b1.likes < b2.likes) )
    )
  }, [])



  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username: username.inputProps.value,
        password: password.inputProps.value
      })
      console.log(username)
      window.localStorage.setItem(
        'loggedInBloglistUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
    } catch(error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

    username.reset()
    password.reset()
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInBloglistUser')
    setUser(null)
  }

  const showErrorMessage = () => {
    if (errorMessage)
      return (<div style={errorStyle}>{errorMessage}</div>)
  }

  const showInfoMessage = () => {
    if (infoMessage)
      return (<div style={infoStyle}>{infoMessage}</div>)
  }

  const handleLike = async (blog) => {
    try {
      blog.likes = blog.likes + 1
      await blogService.addLike(blog)
      setBlogs( blogs.concat().sort((b1, b2) => b1.likes < b2.likes) )
    } catch(error) {
      console.log(error)
    }
  }

  const handleRemove = async (blog) => {
    try {
      if (window.confirm(`Remove blog ${blog.title}`)) {
        await blogService.removeBlog(blog)
        const indexOfBlogToBeRemoved = blogs.indexOf(blog)
        blogs.splice(indexOfBlogToBeRemoved, 1)
        setBlogs(blogs)
      }
    } catch(error) {
      console.log(error)
    }
  }

  const handleAddBlog = async (event) => {
    event.preventDefault()

    console.log('Add new blog with following info', title.inputProps.value, author.inputProps.value, url.inputProps.value)

    try {
      const newBlog = await blogService.addNewBlog({ 
        title: title.inputProps.value,
        author: author.inputProps.value,
        url: url.inputProps.value
      })
      const blogs = await blogService.getAll()
      setBlogs( blogs.sort((b1, b2) => b1.likes < b2.likes) )

      setInfoMessage(`A new blog ${newBlog.title} added`)

      setTimeout(() => {
        setInfoMessage(null)
      }, 5000)

    } catch (error) {
      console.log(error.response.data.error)
    }

    title.reset()
    author.reset()
    url.reset()
  }

  const loginForm = () => (
    <div>
      {showErrorMessage()}
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor='username'>Käyttäjätunnus</label>
          <input {...username.inputProps} id='username' />
        </div>
        <div>
          <label htmlFor='password'>Salasana</label>
          <input {...password.inputProps} id='password' />
        </div>
        <input type='submit' value='Kirjaudu' />
      </form>
    </div>
  )

  const blogList = () => (
    <div>
      <h2>Blogs</h2>
      {showInfoMessage()}
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>Log out</button>
      <Togglable buttonLabel='Create new blog'>
        <NewBlog
          handleAddBlog={handleAddBlog}
          title={title}
          author={author}
          url={url} />
      </Togglable>
      <div id='blogList'>
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            showRemoveButton={blog.user.username === user.username}
            handleLike={() => handleLike(blog)}
            handleRemove={() => handleRemove(blog)} />
        )}
      </div>
    </div>
  )

  return (
    <div>
      {user === null
        ? loginForm()
        : blogList() }
    </div>
  )
}

export default App