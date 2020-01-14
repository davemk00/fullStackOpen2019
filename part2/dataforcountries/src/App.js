import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DisplayCountries from './components/DisplayCountries.js'
import FilterForm from './components/FilterForm.js'

function App() {
  const [countries, setCountries] = useState([])
  const [filterTerm, setFilterTerm] = useState('')

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
      <FilterForm handleFilterChange={handleFilterChange} setFilterTerm={setFilterTerm} />
      <DisplayCountries items={countriesFiltered} filterTerm={filterTerm} setFilterTerm={setFilterTerm}/>
    </div>
  )
}

export default App;
