import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, testHook } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders title, author and likes', () => {
  const blog = {
    title: 'Blog for testing',
    author: 'Testy McTestface',
    likes: 3
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  const titleElement = component.getByText('Blog for testing Testy McTestface')
  expect(titleElement).toBeDefined()

  const likeElement = component.getByText('blog has 3 likes')
  expect(likeElement).toBeDefined()
})