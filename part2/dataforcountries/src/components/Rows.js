import React from 'react'

const Rows = ({ items , filterTerm , setFilterTerm }) => {
  if (items.length === 0) {
    return <div>    
      <span>No country matching search term</span>
    </div>

  }
  if (items.length>10) {
    return <p>More than 10 countries returned, refine search</p>
  }

  if (items.length === 1) {
    console.log(items[0])
    return (
      <div>
        <h1>{items[0].name}</h1>
        <p>Capital: {items[0].capital}</p>
        <p>Population: {items[0].population}</p>
        <h2>Languages: </h2>
        <ul>
          {
            items[0].languages.map(lang => {
            return <li key={lang.name}>{lang.name}</li>
            })
          }
        </ul>
        <img src={items[0].flag} width="150px" />
      </div>
    )
  }

  return (
    <div>
        {items.map(item => {
          return (
            <div>
              <span key={item.name}>{item.name} {item.number} </span>
              <button onClick={() => setFilterTerm(item.name)}>Show</button>
            </div>
          )
        })}
    </div>
  )
}

export default Rows