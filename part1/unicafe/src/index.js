import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
  const { good, neutral, bad } = props

  const all = good + neutral + bad
  const average = (good - bad)/(all)
  const positive = good/all*100 + '%'

  // notify if no feedback given yet
  if (all==0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  // feedbackc list
  return (
    <div>
      <Statistic text = "good" value = {good} />
      <Statistic text = "neutral" value = {neutral} />
      <Statistic text = "bad" value = {bad} />
      <Statistic text = "all" value = {all} />
      <Statistic text = "average" value = {average} />
      <Statistic text = "positive" value = {positive} />
    </div>
  )
}

const Statistic = ({text, value}) => {
  return (
    <div>
      <p>{text} {value}</p>
    </div>
  )
}

  
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>

      <button onClick={() => setGood(good + 1)}>
        good
      </button>
      <button onClick={() => setNeutral(neutral + 1)}>
        neutral
      </button>
      <button onClick={() => setBad(bad + 1)}>
        bad
      </button>

      <h1>statistics</h1>

      <Statistics good={good} neutral={neutral} bad={bad} />


    </div>



  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)