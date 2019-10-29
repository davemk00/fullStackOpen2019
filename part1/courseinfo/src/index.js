import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
  return (
	<div>
		<h1>{props.str}</h1>
	</div>
  )
}

const Content = (props) => {
  return (
    <div>
  	  <p>{props.str1} {props.num2}</p>
      <p>{props.str2} {props.num2}</p>
      <p>{props.str3} {props.num3}</p>
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
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  
  
  return (
    <div>
      <Header str = {course} />
	    <Content  str1 = {part1} num1 = {exercises1}
                str2 = {part2} num2 = {exercises2}
                str3 = {part3} num3 = {exercises3} />
      <Total num = {exercises1 + exercises2 + exercises3} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))