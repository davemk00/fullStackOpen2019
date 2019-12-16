import React from 'react'

const Filter = ({ handleFilterChange }) => (
  <form>
    <div>
      Filter names shown with <input onChange={handleFilterChange} />
    </div>
  </form>
)

export default Filter