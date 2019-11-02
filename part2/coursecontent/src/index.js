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

/*
const Total = ( props ) => {
  return (
	<div>
	  <p>
		  Number of exercises {
        props.course.parts[0].exercises + 
        props.course.parts[1].exercises + 
        props.course.parts[2].exercises}
	  </p>
	</div>
  )
}
*/




ReactDOM.render(<App />, document.getElementById('root'))