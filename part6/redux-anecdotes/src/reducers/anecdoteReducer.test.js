import deepFreeze from 'deep-freeze'
import reducer from '../reducers/anecdoteReducer'

describe('anecdote reducer', () => {
  // test('should return a proper initial state when called with undefined state', () => {
  //   const state = {}
  //   const action = {
  //     type: 'DO_NOTHING'
  //   }

  //   const newState = counterReducer(undefined, action)
  //   expect(newState).toEqual(initialState)
  // })

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
    const newState = reducer(state, action)
  
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
})