import React from 'react'

const Filter = ({ handleFilterChange }) => (
  <form
    id = "filterForm">
    <div className = "entryLine">
      Filter names with: <input
        className = "filterEntry"
        onChange={handleFilterChange} />
    </div>
  </form>
)

export default Filter