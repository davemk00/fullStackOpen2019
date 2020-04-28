describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Cyress Test User',
      username: 'cyTestUser',
      password: 'cyTestPass'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Blog')
    cy.contains('login')
    cy.contains('Blogs:')
  })

  it('Login Button is shown', function () {
    cy.get('button').contains('login')
  })
  
  it('Login Form Appears on clicking Login Button', function () {
    cy.contains('login').click()
    cy.contains('username')
    cy.contains('password')
    cy.get('button').contains('login')
    cy.get('button').contains('cancel')
  })

  it('for correct user and password, login is successful', function () {
    cy.contains('login').click()
    cy.get('#Username').type('cyTestUser')
    cy.get('#Password').type('cyTestPass')
    cy.get('#login-submit').click()
    cy.contains('Cyress Test User logged in')
    cy.get('.Notification')
      .should('contain', 'cyTestUser Logged in')
      .and('have.css', 'color', 'rgb(0, 128, 0)')
      .and('have.css', 'border-style', 'solid')
    cy.get('button').contains('logout')
    cy.get('button').contains('New Blog')
  })

  it('for incorrect user and password, login is UNsuccessful', function () {
    cy.contains('login').click()
    cy.get('#Username').type('cyTestUser')
    cy.get('#Password').type('WrongCyTestPass')
    cy.get('#login-submit').click()
    cy.get('.Notification')
      .should('contain', 'invalid username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')
    cy.get('html').should('not.contain', 'Cyress Test User logged in')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      const user = {
        username: 'cyTestUser',
        password: 'cyTestPass'
      }
      cy.login(user)
    })
    it('a new blog can be created', function () {
      cy.contains('New Blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('authored by cypress')
      cy.get('#url').type('url by cypress')
      cy.contains('Submit').click()
      cy.contains('a blog created by cypress')
      cy.contains('authored by cypress')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'another Cypress Blog',
          author: 'Cypress Test',
          url: 'test URL',
          likes: 12
        })
      })

      it('it can be expanded', function () {
        cy.get('.blogHide > button').click()
        cy.contains('Hide')
        cy.contains('likes')
        cy.contains('test URL')
        cy.contains('Cypress Test')
        cy.contains('Remove')
      })

      describe('and it is expanded', function () {
        beforeEach(function () {
          cy.get('.blogHide > button').click()
        })

        it.only('a like can be added', function () {
          cy.contains('Like').click()
          cy.get('.Notification')
            .should('contain', 'blog another Cypress Blog by Cypress Test has been liked')
            .and('have.css', 'color', 'rgb(0, 128, 0)')
            .and('have.css', 'border-style', 'solid')
        })
      })
    })
  })
})