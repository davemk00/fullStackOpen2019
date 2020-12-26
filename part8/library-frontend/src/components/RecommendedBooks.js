import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, FAVORITE_GENRE } from './queries'

const RecommendedBooks = (props) => {
  const userResults = useQuery(FAVORITE_GENRE)
  const result = useQuery(ALL_BOOKS)

  if (result.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }
  
  const books = result.data.allBooks

  const favoriteGenre = userResults.data.me.favoriteGenre


  return (
    <div>
      <h2>recommended</h2>

      books in your favorite genre: <b>{favoriteGenre}</b>
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
          {books.filter(book => book.genres.includes(favoriteGenre) ? book : null ).map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default RecommendedBooks