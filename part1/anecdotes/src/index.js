// Full Stack Open 2019
// WIP 1.13*

import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = (props) => {
  // Anecdotes vars and selection
  const [selected, setSelected] = useState(0)
  const numAnecdotes = anecdotes.length
  const selectRandomAnecdote = () => {
    setSelected(Math.floor(Math.random() * numAnecdotes))
  }
  
  // Votes cars and updating
  const [votes, setVotes] = useState(Array(numAnecdotes).fill(0))
  const addVote = (selected) => {
    const copyVotes = [...votes]
    copyVotes[selected] += 1
    setVotes(copyVotes)
  }

  return (
    <div>
      {props.anecdotes[selected]}
      <br />

      has {votes[selected]} votes
      <br />

      <Button 
        onClick = {selectRandomAnecdote}
        text = 'Click Me for next quote'
      />

      <br />
      <Button 
        onClick = {() => addVote(selected)}
        text = 'Vote for current quote'
      />

    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)