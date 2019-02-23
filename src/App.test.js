import React from 'react'
import { render, waitForElement } from 'react-testing-library'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  it('if user is not logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )

    await waitForElement(
      () => component.getByText('Kirjaudu')
    )

    const loginElement = component.getByText('Kirjaudu')
    expect(loginElement).toBeDefined()

    const blogListElement = component.container.querySelector('#blogList')
    expect(blogListElement).toBe(null)
  })

  // ei toimi
/*  it('if user is logged in, blogs are rendered', async () => {
    const loggedInUser = {
      token: 'test_token',
      username: 'test_user',
      name: 'test_name'
    }

    window.localStorage.setItem('loggedInBloglistUser', JSON.stringify(loggedInUser))

    const component = render(
      <App />
    )

    component.rerender()

    component.debug()
    await waitForElement(
      () => component.container.querySelector('#blogTitleAndAuthor')
    )

    component.debug()

    const blogListElement = component.container.querySelector('#blogList')

    expect(blogListElement).toHaveTextContent('React patterns Michael Chan')
    expect(blogListElement).toHaveTextContent('Go To Statement Considered Harmful Edsger W. Dijkstra')
    expect(blogListElement).toHaveTextContent('Canonical string reduction Edsger W. Dijkstra')

    const loginElement = component.getByText('Kirjaudu')
    expect(loginElement).toBe(null)
  })*/
})