import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
  return (
	<div>
		<h1>{props.str}</h1>
	</div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.str} {props.num}
      </p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part str = {props.parts[0].name} num = {props.parts[0].exercises} />
      <Part str = {props.parts[1].name} num = {props.parts[1].exercises} />
      <Part str = {props.parts[2].name} num = {props.parts[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  return (
	<div>
	  <p>
		Number of exercises {
      props.parts[0].exercises + 
      props.parts[1].exercises + 
      props.parts[2].exercises}
	  </p>
	</div>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  
  
  return (
    <div>
      <Header str = {course} />
      <Content parts = {parts} />
      <Total parts = {parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))