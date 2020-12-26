## Part 8 library-backend GraphQL

**Commit 1** - 8.1: The number of books and authors
- copy file
- added queries for bookCount and authorCount

**Commit 2** - 8.2: All books
- added allBooks query

**Commit 3** - 8.3: All authors
- added allAuthors query

**Commit 4** - 8.4: Books of an author
- chnaged allBooks to return books from searched author

**Commit 5** - 8.5: Books by genre
- chnaged allBooks to return books from searched genre

**Commit 6** - 8.6: Adding a book
- added mutation addBook

**Commit 7** - 8.7: Updating the birth year of an author
- added editAuthor
  
**Commit 13** - 8.13: Database, part 1
- got it to write to mongodb
- most of front end works with small changes to front end and back end
  
**Commit 14** - 8.14: Database, part 2
- fixed all query and mutation working with parameters
- some error message checking
  
**Commit 15** - 8.15: Database, part 3
- fixed addBook when author already exists
- validation already done
  
**Commit 16** - 8.16 user and logging in
- backend now requires login, token, etc
- require currentUser for addBook, editAuthor

**Commit 17** - 8.17 Listing books
- the listing of books was done earlier so in this commit:
- I fixed the missing context from editAuthor

**Commit 18** - 8.18 Log in
- added user login
- conditional display components

**Commit 20** - 8.19 Books by genre, part 1
  - changed query to return filtered genres (and author)

**Commit 22** - 8.23: Subscriptions - server
- added backend subscription


