import React, { useEffect, useState } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, FAVORITE_GENRE } from './queries'

const RecommendedBooks = (props) => {
  const [favoriteGenre, setFavoriteGenre] = useState('')
  const [ books, setBooks ] = useState([])

  const [getFavoriteGenre, userResult] = useLazyQuery(FAVORITE_GENRE, {
    onCompleted: (data) => {
      if (data.me !== null) {
        let favorite = data.me.favoriteGenre

        setFavoriteGenre(favorite)
        getBooks({ variables: { genre: favorite } })
      }
    },
  })
  const [ getBooks, bookResult ] = useLazyQuery(ALL_BOOKS, {
    onCompleted: (data) => {
      setBooks(data.allBooks)
    },
  })
  
  useEffect(() => {
    getFavoriteGenre()
  }, [getFavoriteGenre, props.show])
  
  if (bookResult.loading || books.length == 0 || favoriteGenre == '' ) {
    return <div>loading...</div>
  }
  
  if (!props.show) {
    return null
  }
    
    
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
          {books.map(a =>
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