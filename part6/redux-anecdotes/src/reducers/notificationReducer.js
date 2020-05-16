const initialState = ''

const notificationReducer = (state = initialState, action) => {
  // console.log(state)
  // console.log(action)
  
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data.notification
    default:
      return state
  }
}

export const notificationAction = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    data: {
      notification
    }
  }
}

export default notificationReducer