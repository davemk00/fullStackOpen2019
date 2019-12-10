import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [ newName, setNewName ] = useState('')

  const rows = () => persons.map(person => 
   // <p key={person.name} />
    <p key={person.name}>{person.name}</p>
  )

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const person = { name: newName }
    const checkExists = persons.findIndex(person => person.name.toLowerCase() === newName.toLowerCase())
    checkExists > -1
      ? window.alert(`${person.name} is already in the phone book`)
      : setPersons(persons.concat(person))
    setNewName('')
  }

  return (    
    <div>

      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
            value = {newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {rows()}

    </div>
  )
}

export default App