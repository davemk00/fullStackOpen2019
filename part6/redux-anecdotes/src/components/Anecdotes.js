import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { notificationAction } from '../reducers/notificationReducer'

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filterValue = useSelector(state => state.filter)

  const vote = (id) => {
    // console.log('vote', id)
    const anecdoteToMsg = anecdotes.find(n => n.id === id)
    const msg = `Voted for anecdote: (id: ${id}) '${anecdoteToMsg.content}'`
    dispatch(addVote(id))
    dispatch(notificationAction(msg, 'info'))
    setTimeout(() => dispatch(notificationAction('', '')), 5000)
  }

  return (
    <div>
      {anecdotes
        .filter(anecdote => anecdote.content.indexOf(filterValue) > -1)
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
          <div>
          {anecdote.content}
          </div>
          <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
          </div>
          )
        }
    </div>
  )
}

export default Anecdotes