import React from 'react'
import CountryInfo from './CountryInfo'

const DisplayCountries = ({ items , setFilterTerm }) => {
  
  if (items.length === 0) {
    return (
      <div>    
        <span>No country matching search term</span>
      </div>
    )
  }
  
  if (items.length>10) {
    return <p>More than 10 countries returned, refine search</p>
  }

  if (items.length === 1) {
    
    return (
      <div>
        <CountryInfo country = {items[0]} />
      </div>
    )
  }

  return (
    <div>
        {items.map(item => 
            <div key={item.name}>  
              <span>{item.name} {item.number} </span>
              <button onClick={() => setFilterTerm(item.name)}>Show</button>
            </div>
        )}
    </div>
  )
}

export default DisplayCountries