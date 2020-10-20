  
import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from './queries'


const AuthorEditForm = ( props ) => {
  const [name, setName] = useState('')
  const [setBornTo, setSetBornTo] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const authorsSelect = props.authors.map(a => {
    return <option value={a.name} key={a.name}> {a.name} </option>
  })

  const submit = async (event) => {
    event.preventDefault()
    
    console.log('add author year born...')

    editAuthor({  variables: { name, setBornTo } })

    setName('')
    setSetBornTo('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <h3>Set birthyear</h3>
        <div>
          author select
          <select value={name} onChange={({ target }) => setName(target.value)}> 
            {authorsSelect}
          </select>
        </div>
        <div>
          born
          <input
            type='number'
            value={setBornTo}
            onChange={({ target }) => setSetBornTo(target.valueAsNumber)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default AuthorEditForm
