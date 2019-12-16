import React, { useState } from 'react'
import AddPersonForm from './components/AddPersonForm.js'
import Rows from './components/Rows.js'
import Filter from './components/Filter.js'


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
      <Filter handleFilterChange = {handleFilterChange} />

      <h2>Add a new name and number</h2>
      <AddPersonForm
        addPerson = {addPerson}
        newName = {newName}
        handleNameChange = {handleNameChange}
        newNumber = {newNumber}
        handleNumberChange = {handleNumberChange}
      />

      <h2>Numbers</h2>
      <Rows persons={persons} filterTerm={filterTerm} />

    </div>
  )
}

export default App