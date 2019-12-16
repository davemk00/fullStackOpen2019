import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')


  const rows = () => persons.map(person => 
   // <p key={person.name} />
    <p key={person.name}>{person.name} {person.number}</p>
  )


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }


  const addPerson = (event) => {
    event.preventDefault()
    const person = { name: newName, number: newNumber }
    const checkExists = persons.findIndex(person => person.name.toLowerCase() === newName.toLowerCase())
    checkExists > -1
      ? window.alert(person.name + ' is already in the phone book')
      : setPersons(persons.concat(person))
    setNewName('')
    setNewNumber('')
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
        <div>number: <input 
            value = {newNumber}
            onChange={handleNumberChange}
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