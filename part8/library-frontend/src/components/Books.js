import React, { useEffect, useState } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from './queries'

const Books = (props) => {
  const [filter, setFilter] = useState('')
  const [genres, setGenres] = useState([])
  const [ books, setBooks ] = useState([])
  const [getBooks, { loading, error, data }] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    getBooks({ variables: { genre: filter } })
      if (data && data.allBooks) {
        setBooks(data.allBooks)
      }
  }, [data, filter, getBooks])

  if (error) return `Error! ${error}`;

  if (data) {
    const books = data.allBooks
    books.forEach(book => book.genres.forEach( genre =>  
      (genres.indexOf(genre.toLowerCase()) === -1) 
      ? genres.push(genre.toLowerCase()) 
      : null  
      ) )
  }

  if (!props.show) {
    return null
  }
  
  return (
    <div>
      <h2>books</h2>

      in genre: <b>{(filter) ? filter : 'all genres'}</b>
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
          { (loading || !data)
            ? <tr key='loading'> 
                <td>loading...</td>
              </tr>
            : books.map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
             )
          }
        </tbody>
      </table>
      <h3>filter genre:</h3>
      <div>
        {genres.map(genre =>
          <button key={genre} onClick={() => setFilter(genre)}>{genre}</button>
        )}
        <button key='all genres' onClick={() => setFilter('')}>all genres</button>
      </div>
      <p> </p>
      <p> </p>
    </div>
  )
}

export default Books