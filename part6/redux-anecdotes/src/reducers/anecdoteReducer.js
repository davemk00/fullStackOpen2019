// const generateId = () => (100000 * Math.random()).toFixed(0)

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
      const anecdoteToChange = state.find(n => n.id === id)
      const currentVotes = anecdoteToChange.votes
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: currentVotes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    case 'ZERO':
      console.log('Zero')
      return state
    default:
      return state
  }
}

export const initialiseAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}

export const addVote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data: data
  }
}

export default anecdoteReducer