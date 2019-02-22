import React, { useState, useEffect } from 'react'
import NewBlog from './components/NewBlog'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const errorStyle = {
  border: '2px solid red',
  borderRadius: '5px',
  background: '#e8eae9',
  padding: '5px',
  color: 'red',
  fontFamily: 'Comic Sans MS',
  display: 'inline-block' 
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInBloglistUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
    }
  })

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })  

      window.localStorage.setItem(
        'loggedInBloglistUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(error) {
      setErrorMessage('käyttäjätunnus tai salasana virheellinen')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInBloglistUser')
    setUser(null)
  }

  const showErrorMessage = () => {
    if (errorMessage)
      return (<div style={errorStyle}>{errorMessage}</div>)
  }

  const loginForm = () => (
    <div>
      {showErrorMessage()}
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor='username'>Käyttäjätunnus</label>
          <input onChange={({target}) => setUsername(target.value)} id='username' type='text' />
        </div>
        <div>
          <label htmlFor='password'>Salasana</label>
          <input onChange={({target}) => setPassword(target.value)} id='password' type='text' />
        </div>
        <input type='submit' value='Kirjaudu' />
      </form>
    </div>
  )

  const blogList = () => (
    <div>
      <h2>Blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>Log out</button>
      <NewBlog blogs={blogs} setBlogs={setBlogs}></NewBlog>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}    
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