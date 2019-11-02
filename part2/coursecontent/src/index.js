// Submission for Part 2 - Course Contents
// Original index.js from my 1.5 submission

import React from 'react'
import ReactDOM from 'react-dom'


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }
  
  return (
    <div>
      <Course course = { course } />
    </div>
  )
}

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
		<h1>{ name }</h1>
	</div>
  )
}

const Content = ({ parts }) => {
  const rows = () => parts.map(part => 
    <p key = {part.id}>{part.name} {part.exercises}</p>
  )

  return (
    <div>
      {rows()}
    </div>
  )
}


const Total = ({ parts }) => {
  const total = parts.reduce( (acc, part) => {
    return (acc + part.exercises)
  }, 0)
  
  return (
	<div>
	  <b>
		  Total of {total} exercises
	  </b>
	</div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))