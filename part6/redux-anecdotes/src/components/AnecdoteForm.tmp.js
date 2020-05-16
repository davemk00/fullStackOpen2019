import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AnecdoteForm from './AnecdoteForm'

test('<AnecdoteForm /> updates parent state and calls onSubmit', () => {
  const anecdote = {
    content: 'This is for a test of the AnecdoteForm'
  }

  const mockHandler = jest.fn()

  const component = render(
    <AnecdoteForm anecdote={anecdote} />
  )

  const button = component.getByText('create')
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})