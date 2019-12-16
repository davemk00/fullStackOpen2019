import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterTerm, setFilterTerm ] = useState('')


  const rows = () => persons
    .filter(person => 
      person.name.toLowerCase().indexOf(filterTerm.toLowerCase()) > -1 )  // tried .includes, but couldn't get it to work
    .map(person => (
      <p key={person.name}>{person.name} {person.number} </p>
    ))


  const handleNameChange = (event) => {setNewName(event.target.value)}
  const handleNumberChange = (event) => {setNewNumber(event.target.value)}
  const handleFilterChange = (event) => {setFilterTerm(event.target.value)}


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

      <form>
        <div>
          Filter names shown with <input onChange={handleFilterChange} />
        </div>
      </form>

      <h2>Add a new name and number</h2>

      <form onSubmit={addPerson}>
        <div>
          Name: <input 
            value = {newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          Number: <input 
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