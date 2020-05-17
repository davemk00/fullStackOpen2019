import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  // console.log('anecdote state now: ', state)
  // console.log('anecdote action: ', action)

  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'VOTE':
      const id = action.data.id
      const votes = action.data.votes
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: votes
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    case 'ZERO':   // not implemented elsewhere
      console.log('Zero')
      return state
    default:
      return state
  }
}

export const initialiseAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const addVote = (id) => {
  return async dispatch => {
    const response = await anecdoteService.updateVotes(id)
    dispatch({
      type: 'VOTE',
      data: response.data
    })
  }
}

export const createAnecdote = (data) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(data)
    dispatch ({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export default anecdoteReducer