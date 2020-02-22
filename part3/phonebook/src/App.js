import React, { useState, useEffect } from 'react'
import AddPersonForm from './components/AddPersonForm.js'
import Filter from './components/Filter.js'
import personService from './services/persons'
import './index.css'

const Notification =({ message }) => {
  if (message === null) {
    return null
  }
  
  return (
    <div className = "msg">
      {message}
    </div>
  )
}

const App = () => {

  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterTerm, setFilterTerm ] = useState('')
  const [ message, setMessage ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
    },[])


  const handleNameChange = (event) => {setNewName(event.target.value)}
  const handleNumberChange = (event) => {setNewNumber(event.target.value)}
  const handleFilterChange = (event) => {setFilterTerm(event.target.value)}

  const addPerson = (event) => {
    event.preventDefault()
    // console.log(persons)
    const person = { 
      name: newName, 
      number: newNumber
    }

    if (!newNumber || !newName) {
      setMessage(`Missing data - cannot add entry to database`)
    } else {

      //Check that the person is already in the list 
      const checkExists = persons.findIndex(person => person.name.toLowerCase() === newName.toLowerCase())
      let personUpdatedId = -1
      
      // get the id of the person should it exist, else index remains as -1
      if (checkExists > -1) {personUpdatedId = persons[checkExists].id} 

      checkExists > -1    // If the person already exists
        ? window.confirm(`${person.name} is already in the phonebook, update number?`)  // ask for confirmation to update
          ? personService   // Update
            .update(personUpdatedId, person)
            .then(
              response => {
                // console.log(response)
                setMessage(`${person.name} updated`)
                setTimeout(() => {setMessage(null)}, 5000)                
                setPersons(
                  persons.map(p => (p.id !== personUpdatedId ? p : person))
                )
              }
            )
            .catch(error => {   // promise catch
              setMessage(`The name '${person.name}' was already deleted from the server`)
              setTimeout(() => {setMessage(null)}, 5000) 
              
              personService
              .getAll()
              .then(response => {
                setPersons(response.data)
              })
            })

          : console.log(`${person.name} not updated`)  // Some other error??
        
        : (personService  // If the person doesn't exist already then create
            .create(person)
            .then(response => {
              // console.log(response.data)
              setPersons(persons.concat(response.data))
              setMessage(`${person.name} added`)
              setTimeout(() => {setMessage(null)}, 5000)
            })
            .catch(error => {   // promise catch
              setMessage(`Error`)
              setTimeout(() => {setMessage(null)}, 5000)})
          )
      setNewName('')
      setNewNumber('')
    }
  }

  const deletePerson = ( name, id ) => {
    // console.log(id)
    window.confirm(`Are you sure you want to delete ${name} (id: ${id})`)
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
      <tr key={person.name}>
        <th>{person.name}</th><th>{person.number}</th><th>
        <button onClick={() => { 
          // console.log(person)
          deletePerson( person.name, person.id )}
        }>delete</button>
        </th>
      </tr>
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

      <Notification message={message} />

      <h2>Numbers</h2>
      <table><tbody>
        <Rows id= "phonebook" persons={persons} filterTerm={filterTerm} />
      </tbody></table>
    </div>
  )
}

export default App