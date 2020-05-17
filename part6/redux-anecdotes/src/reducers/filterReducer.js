const initialState = ''

const filterReducer = (state = initialState, action) => {
  // console.log('filter state now: ', state)
  // console.log('filter action: ', action)

  switch (action.type) {
    // case 'INIT_ANECDOTES':
    //   return action.data
    case 'SET_FILTER':
      state = action.data.content
      return state
    case 'CLEAR_FILTER':
      console.log(action)
      return state
    default:
      return state
  }
}

export const filterClearAction = () => {
  return {
    type: 'CLEAR_FILTER',
    data: { content: '' }
  }
}

export const filterSetAction = (content) => {
  return {
    type: 'SET_FILTER',
    data: {
      content
    }
  }
}

export default filterReducer