import React from 'react'
import { connect } from 'react-redux'
import { filterSetAction } from '../reducers/filterReducer'

const FilterForm = (props) => {
  const style = { marginBottom: 10 }
  
  const setFilter = (event) => {
    event.preventDefault()
    props.filterSetAction(event.target.value)
  }

  return (
    <div style={style}>
      filter <input onChange={ setFilter } />
    </div>
  )
}

const mapDispatchToProps = {
  filterSetAction,
}

export default connect(
  null,
  mapDispatchToProps
)(FilterForm)