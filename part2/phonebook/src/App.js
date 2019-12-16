import React, { useState, useEffect } from 'react'
import AddPersonForm from './components/AddPersonForm.js'
import Rows from './components/Rows.js'
import Filter from './components/Filter.js'

import axios from 'axios'


const App = () => {

  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterTerm, setFilterTerm ] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response =>{
        console.log(response.data)
        setPersons(response.data)
      }
    )
  }
  
  useEffect(hook, [])



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