import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import Blog from './Blog'

const blog = {
  title: 'Blog name',
  author: 'The ultimate blog writer',
  url: 'http://test.url',
  likes: 3,
  user: {
    name: 'Random person'
  }
}



test('by default, only blog name and author are visible', () => {
  const mockHandleLike = jest.fn()
  const mockHandleRemove = jest.fn()

  const component = render(
    <Blog blog={blog} showRemoveButton={true} handleLike={mockHandleLike} handleRemove={mockHandleRemove} />
  )

  const titleElement = component.container.querySelector('#blogTitleAndAuthor')
  expect(titleElement).not.toHaveStyle('display: none')

  const detailsElement = component.container.querySelector('#blogAdditionalDetails')
  expect(detailsElement).toHaveStyle('display: none')
})

test('after clicking, rest of details are visible too', () => {
  const mockHandleLike = jest.fn()
  const mockHandleRemove = jest.fn()

  const component = render(
    <Blog blog={blog} showRemoveButton={true} handleLike={mockHandleLike} handleRemove={mockHandleRemove} />
  )

  const titleElement = component.container.querySelector('#blogTitleAndAuthor')
  fireEvent.click(titleElement)
  expect(titleElement).not.toHaveStyle('display: none')

  const detailsElement = component.container.querySelector('#blogAdditionalDetails')
  expect(detailsElement).not.toHaveStyle('display: none')
})