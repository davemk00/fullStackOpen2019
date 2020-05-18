const initialState = {
  message: '', type: ''
}

const notificationReducer = (state = initialState, action) => {
  // console.log('notification state now: ', state)
  // console.log('notification action: ', action)
  
  switch (action.type) {
    case 'SET_NOTIFICATION':
      const msg = action.notification.message
      const type = action.notification.type
      state = {
        message: msg, type: type
      }
      return state
    case 'CLEAR_NOTIFICATION':
      state = initialState
      return state
    default:
      return state
  }
}

var timeoutID

export const notificationAction = (message, type, duration) => {
  // console.log(message)
  // console.log(type)
  clearTimeout(timeoutID)
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: {
        message,
        type
      }
    })
    timeoutID = setTimeout(() =>
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      }),
      duration * 1000)
  }
}

export default notificationReducer