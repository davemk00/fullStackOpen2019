import React from 'react'
import WeatherInfo from './WeatherInfo'

const CountryInfo = ({country}) => {

  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages: </h2>
      <ul>
        {
          country.languages.map(lang => {
          return <li key={lang.name}>{lang.name}</li>
          })
          }
      </ul>
      <img src={country.flag} width="150px" alt='weatherImage'/>
      <WeatherInfo country={country} />
    </div>
  )
}

export default CountryInfo
