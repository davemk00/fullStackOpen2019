import React from 'react'

const Rows = ({ persons , filterTerm }) => persons
  .filter(person => 
    person.name.toLowerCase().indexOf(filterTerm.toLowerCase()) > -1 )  // tried .includes, but couldn't get it to work
  .map(person => (
    <p key={person.name}>{person.name} {person.number} </p>
))

export default Rows