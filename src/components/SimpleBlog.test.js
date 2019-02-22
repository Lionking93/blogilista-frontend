import React from 'react'
import 'jest-dom/extend-expect'
import { render, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

const blog = {
  title: 'Blog for testing',
  author: 'Testy McTestface',
  likes: 3
}

test('renders title, author and likes', () => {
  const component = render(
    <SimpleBlog blog={blog}  />
  )

  const titleElement = component.getByText('Blog for testing Testy McTestface')
  expect(titleElement).toBeDefined()

  const likeElement = component.getByText('blog has 3 likes')
  expect(likeElement).toBeDefined()
})

test('clicking like button calls the event handler once', () => {
  const mockHandler = jest.fn()

  const component = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = component.getByText('like')
  fireEvent.click(button)

  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})