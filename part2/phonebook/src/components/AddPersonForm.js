import React from 'react'

const AddPersonForm = props => (

  <form onSubmit={props.addPerson}>
    <div className = "entryLine">
      Name: <input
        className = "entry"
        value = {props.newName}
        onChange={props.handleNameChange}
      />
    </div>
    <div className = "entryLine">
      Number: <input 
        className = "entry"
        value = {props.newNumber}
        onChange={props.handleNumberChange}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

export default AddPersonForm