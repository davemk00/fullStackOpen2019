import React from 'react'
import { useDispatch } from 'react-redux'
import { filterSetAction } from '../reducers/filterReducer'

const FilterForm = () => {
  const dispatch = useDispatch()
  const style = { marginBottom: 10 }
  
  const setFilter = (event) => {
    event.preventDefault()
    dispatch(filterSetAction(event.target.value))
  }

  return (
    <div style={style}>
      filter <input onChange={ setFilter } />
    </div>
  )
}

export default FilterForm