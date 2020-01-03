import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Rows from './components/Rows.js'
import FilterForm from './components/FilterForm.js'

function App() {
  const [countries, setCountries] = useState([])
  const [filterTerm, setFilterTerm] = useState('iraq')
  const [searchResults, setSearchResults] = useState([])

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const handleFilterChange = (event) => {
    setFilterTerm(event.target.value.toLowerCase())
  }

  const countriesFiltered = filterTerm
  ? countries.filter(
    country => country.name.toLowerCase().indexOf(filterTerm.toLowerCase()) > -1
  )
  : countries

  return (
    <div>
      <h2>Find Countries</h2>
      <FilterForm handleFilterChange={handleFilterChange} />
      <Rows items={countriesFiltered} filterTerm={filterTerm} />
    </div>
  )
}

export default App;
