import React from 'react'

const FilterForm = ({filterTerm , setFilterTerm , handleFilterChange }) => (
  <form>
    <div>
      Filter with <input id='filterTerm' value={filterTerm} onChange={handleFilterChange} />
      <button onClick={() => setFilterTerm('')}>Clear</button>
    </div>
  </form>
)

export default FilterForm