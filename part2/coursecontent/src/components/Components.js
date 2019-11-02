import React from 'react'

const Course = ({ course }) => {
  const { name, parts } = course

  return (
    <div>
      <Header name = { name } />
      <Content parts = { parts } />
      <Total parts = { parts } />
    </div>
  )
}

const Header = ({ name }) => {
  return (
    <div>
      <h2>{ name }</h2>
    </div>
  )
}

const Content = ({ parts }) => {
  const rows = () => parts.map(part => 
    <p key = {part.id}>{part.name} {part.exercises}</p>
  )

  return (
    <div>
      { rows() }
    </div>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce( (sum, part) => {
    return (sum + part.exercises);
  }, 0)
  
  return (
	<div>
	  <b>
		  Total of {total} exercises
	  </b>
	</div>
  )
}

export default Course