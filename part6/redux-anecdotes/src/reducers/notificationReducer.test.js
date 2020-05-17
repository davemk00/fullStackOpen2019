import deepFreeze from 'deep-freeze'
import notificationReducer from './notificationReducer'

describe('notification reducer', () => {  
  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = notificationReducer(undefined, action)
    expect(newState.message).toBe('')
    expect(newState.type).toBe('')
    expect(newState).toBeDefined()
  })

  test('returns new state with action: SET_NOTIFICATION', () => { 
    const action = {
      type: 'SET_NOTIFICATION',
      notification: {
        message: 'A test notification for reducer test with action: SET_NOTIFICATION',
        type: 'info'
      }
    }
    const state = {}

    deepFreeze(state)
    const newState = notificationReducer(state, action)
    
    expect(newState).toEqual(action.notification)
    expect(newState).not.toEqual(state)
  })
})