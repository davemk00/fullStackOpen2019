
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import RecommendedBooks from './components/RecommendedBooks'
import { useApolloClient, useSubscription } from '@apollo/client'
import { BOOK_ADDED, ALL_BOOKS } from './components/queries'

const App = () => {
  const [page, setPage] = useState('recommended')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  let cacheTrigger = []

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => set.map(a => a.id).includes(object.id)
    console.log('updatingCache')

    const dataInStore = client.readQuery({ query: ALL_BOOKS, variables: { genre: '' } })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS, variables: { genre: '' },
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }
    cacheTrigger = new Set()
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      // window.alert(`Book: ${addedBook} added!`)
      updateCacheWith(addedBook)
    }
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommended')}>recommended</button>        
        
        { ( !token ) 
        ? (
            <>
              <button onClick={() => setPage('login')}>login</button> 
            </>
          )
          : ( 
            <>
              {/* <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => setPage('recommended')}>recommended</button> */}
              <button onClick={logout} >logout</button> 
            </>
          )
        }
      </div>

      <Authors
        show={page === 'authors'}
        token={token}
      />

      <Books
        show={page === 'books' || page === 'add' }
        cacheTrigger={cacheTrigger}
      />

      <RecommendedBooks
        show={page === 'recommended'}
      />

      <NewBook
        show={page === 'add'}
        updateCacheWith={updateCacheWith}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />

    </div>
  )
}

export default App