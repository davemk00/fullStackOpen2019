import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { notificationAction } from '../reducers/notificationReducer'

const Anecdotes = (props) => {
  const dispatch = useDispatch()
  // console.log(props)
  // const anecdotes = useSelector(state => state.anecdotes)
  const anecdotes = props.anecdotes
  const filterValue = useSelector(state => state.filter)

  const vote = async (id) => {
    // console.log('vote', id)
    const anecdoteToMsg = anecdotes.find(n => n.id === id)
    const msg = `Voted for anecdote: (id: ${id}) '${anecdoteToMsg.content}'`
    dispatch(addVote(id))
    dispatch(notificationAction(msg, 'info', 5))
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

const mapStateToProps = (state) => {
  // console.log(state)
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const ConnectedAnecdotes = connect(mapStateToProps)(Anecdotes)

export default ConnectedAnecdotes