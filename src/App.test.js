import React from 'react'
import { render, waitForElement, wait } from 'react-testing-library'
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
})