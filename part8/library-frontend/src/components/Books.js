import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from './queries'

const Books = (props) => {
  const [filter, setFilter] = useState("all genres")
  const result = useQuery(ALL_BOOKS)
  console.log(filter)

  if (result.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }
  
  const books = result.data.allBooks
  console.log(books)
  // get all genres to populate the buttons
  const genres = new Array()
  books.forEach(book => book.genres.forEach( genre =>  (genres.indexOf(genre) === -1) ? genres.push(genre) : null  ) )
  console.log(genres)

  return (
    <div>
      <h2>books</h2>

      in genre: <b>{filter}</b>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.filter(book => filter === 'all genres' ? book : book.genres.includes(filter) ).map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h3>filter genre:</h3>
      <div>
        {genres.map(genre =>
          <button key={genre} onClick={() => setFilter(genre)}>{genre}</button>
        )}
        <button key='all genres' onClick={() => setFilter('all')}>all</button>
      </div>
    </div>
  )
}

export default Books