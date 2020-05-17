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
    default:
      return state
  }
}

export const notificationAction = (message, type) => {
  console.log(message)
  console.log(type)
  return {
    type: 'SET_NOTIFICATION',
    notification: {
      message,
      type
    }
  }
}

export default notificationReducer