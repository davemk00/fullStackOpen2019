const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const generateId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: generateId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = initialState, action) => {
  // console.log('state now: ', state)
  // console.log('action: ', action)

  switch (action.type) {
    // case 'INIT_ANECDOTES':
    //   return action.data
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

// export const initialiseAnecdotes = (anecdotes) => {
//   return {
//     type: 'INIT_ANECDOTES',
//     data: anecdotes,
//   }
// }

export const addVote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content,
      votes: 0,
      id: generateId()
    }
  }
}


export default anecdoteReducer