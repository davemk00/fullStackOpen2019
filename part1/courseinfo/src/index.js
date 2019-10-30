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
      <Part str={props.str1} num={props.num1} />
      <Part str={props.str2} num={props.num2} />
      <Part str={props.str3} num={props.num3} />
    </div>
  )
}

const Total = (props) => {
  return (
	<div>
	  <p>
		Number of exercises {props.num}
	  </p>
	</div>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  
  
  return (
    <div>
      <Header str = {course} />
	    <Content  str1 = {part1.name} num1 = {part1.exercises}
                str2 = {part2.name} num2 = {part2.exercises}
                str3 = {part3.name} num3 = {part3.exercises} />
      <Total num = {part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))