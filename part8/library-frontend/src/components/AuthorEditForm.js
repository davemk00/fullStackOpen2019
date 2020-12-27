  
import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from './queries'


const AuthorEditForm = ( props ) => {
  const [name, setName] = useState('')
  const [setBornTo, setSetBornTo] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  useEffect(() => {
    setName(props.authors[0].name)
  }, [props.authors])

  const handleAuthorChange = (event) => {
    setName(event.target.value)
  }

  const handleBornChange = (event) => {
    setSetBornTo(event.target.valueAsNumber)
  }

  if (!props.show) {
    return null
  }

  const authorsSelect = props.authors.map(a => {
    return <option value={a.name} key={a.name}> {a.name} </option>
  })

  const submit = async (event) => {
    event.preventDefault()
    console.log(props.authors[0].name)
    
    console.log('add author year born...')
    if (!name) {setName(props.authors[0].name)}
    console.log(name)

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
          <select onChange={handleAuthorChange}> 
            {authorsSelect}
          </select>
        </div>
        <div>
          born
          <input
            type='number'
            value={setBornTo}
            onChange={handleBornChange}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default AuthorEditForm
