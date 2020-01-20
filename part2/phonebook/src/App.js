import React, { useState, useEffect } from 'react'
import AddPersonForm from './components/AddPersonForm.js'
//import Rows from './components/Rows.js'
import Filter from './components/Filter.js'

import personService from './services/persons'

const App = () => {

  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterTerm, setFilterTerm ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initPersons =>{
        setPersons(initPersons.data)
      })
    },[])



  const handleNameChange = (event) => {setNewName(event.target.value)}
  const handleNumberChange = (event) => {setNewNumber(event.target.value)}
  const handleFilterChange = (event) => {setFilterTerm(event.target.value)}

  const checkExists = persons.findIndex(person => person.name.toLowerCase() === newName.toLowerCase())

  const addPerson = (event) => {
    event.preventDefault()
    console.log(persons)
    const person = { 
      name: newName, 
      number: newNumber 
    }
    console.log(person)
    checkExists > -1
      ? window.alert(person.name + ' is already in the phone book')
      : (personService
          .create(person)
          .then(response => 
            {console.log(response)},
            setPersons(persons.concat(person))
          )
        )
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {
    console.log(id)
    window.confirm(`Are you sure you want to delete ${id}`)
      ? personService.remove(id)
        .then(() => {
          setPersons([...persons.filter(p => p.id !== id)])
        }) 
      : console.log(`Not removed entry id: ${id}`)
  }

  const Rows = ({ persons , filterTerm }) => 
  persons
    .filter(person => 
      person.name.toLowerCase().indexOf(filterTerm.toLowerCase()) > -1 )  // tried .includes, but couldn't get it to work
    .map(person => (
      <p key={person.name}>{person.name} {person.number} 
        <button onClick={() => 
          deletePerson(person.id)
        }>delete</button>
      </p>
    ))

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