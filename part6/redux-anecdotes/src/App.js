import React, {useEffect} from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Anecdotes from './components/Anecdotes'
import Notification from './components/Notification'
import FilterForm from './components/FilterForm'
import { initialiseAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import anecdoteService from './services/anecdotes'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService.getAll().then(anecdotes =>
      dispatch(initialiseAnecdotes(anecdotes))
    )
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <FilterForm />
      <Anecdotes />
      <AnecdoteForm />
    </div>
  )
}

export default App