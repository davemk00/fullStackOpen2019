import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { notificationAction } from '../reducers/notificationReducer'

const Anecdotes = (props) => {
  // console.log(props)
  const anecdotes = props.anecdotes
  const filterValue = props.filter

  const vote = async (id) => {
    // console.log('vote', id)
    const anecdoteToMsg = anecdotes.find(n => n.id === id)
    const msg = `Voted for anecdote: (id: ${id}) '${anecdoteToMsg.content}'`
    props.addVote(id)
    props.notificationAction(msg, 'info', 5)
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

const mapDispatchToProps = {
  addVote,
  notificationAction
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(Anecdotes)

export default ConnectedAnecdotes