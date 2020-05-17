import deepFreeze from 'deep-freeze'
import anecdoteReducer from '../reducers/anecdoteReducer'

describe('anecdote reducer', () => {  
  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = anecdoteReducer(undefined, action)
    // expect(newState).toEqual(initialState)
    expect(newState.length).toBe(6)
  })

  test('returns increased vote with action VOTE', () => {
    const state = [
      {
        content: 'a sample anecdote',
        votes: 1,
        id: 1
      },
      {
        content: 'more anecdotes are hard to think of',
        votes: 0,
        id: 2
      }]
  
    const action = {
      type: 'VOTE',
      data: {
        id: 2
      }
    }
  
    deepFreeze(state)
    const newState = anecdoteReducer(state, action)
  
    expect(newState.length).toBe(2)
  
    expect(newState).toContainEqual(state[0])
    
    expect(newState).toContainEqual({
      content: 'a sample anecdote',
      votes: 1,
      id: 1
    },{
      content: 'more anecdotes are hard to think of',
      votes: 1,
      id: 2
    })
  })

  test('returns new state with action: NEW_ANECDOTE', () => { 
    const state = []
    const action = {
      type: 'NEW_ANECDOTE',
      data: {
        content: 'A test anecdote for reducer test with action: NEW_ANECDOTE',
        votes: 0,
        id: 3
      }
    }

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)

    expect(newState.length).toBe(1)
    expect(newState).toContainEqual(action.data)
  })
})