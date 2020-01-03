import React from 'react'

const FilterForm = ({filterTerm , handleFilterChange }) => (
  <form>
    <div>
      Filter with <input value={filterTerm} onChange={handleFilterChange} />
    </div>
  </form>
)

export default FilterForm