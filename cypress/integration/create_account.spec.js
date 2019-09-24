import faker from 'faker'

const email = faker.internet.email()
const password = faker.internet.password()

context('Account', () => {
  before(() => {
    cy.visit('/')
  })

  it('Check fields is visible', () => {
    cy.get('[data-cy=email]').should('be.visible')
    cy.get('[data-cy=password]').should('be.visible')
    cy.get('[data-cy=bt-login]').should('be.visible')
    cy.get('[data-cy=bt-create-account]').should('be.visible')
  })

  it('Click in create account with empty values and chave class inputs', () => {
    cy.get('[data-cy=bt-login]').click()
    cy.get('[data-cy=email]').parent().parent().should('have.class', 'text-negative')
    cy.get('[data-cy=password]').parent().parent().should('have.class', 'text-negative')
    cy.get('[data-cy=bt-create-account]').click()
  })

  it('check route and fields is visible', () => {
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/auth/create')
    })
    cy.get('[data-cy=name]').should('be.visible')
    cy.get('[data-cy=email]').should('be.visible')
    cy.get('[data-cy=password]').should('be.visible')
    cy.get('[data-cy=birthDay]').should('be.visible')
    cy.get('[data-cy=btn-create]').should('be.visible')
  })

  it('Click in create and show errors if values is empty', () => {
    cy.get('[data-cy=btn-create]').click()
    cy.get('[data-cy=name]').parent().parent().should('have.class', 'text-negative')
    cy.get('[data-cy=email]').parent().parent().should('have.class', 'text-negative')
    cy.get('[data-cy=password]').parent().parent().should('have.class', 'text-negative')
    cy.get('[data-cy=btn-create]').should('be.visible')
  })

  it('Create a new user', () => {
    cy.server()
    cy.route('POST', '**/api/users').as('save')

    cy.get('[data-cy=name]').click().type(faker.name.findName())
    cy.get('[data-cy=email]').click().type(email)
    cy.get('[data-cy=password]').click().type(password)
    cy.get('.material-icons').click()
    cy.get(':nth-child(24) > .q-btn > .q-btn__content > div').click()
    cy.get('[data-cy=btn-create]').click()
    cy.wait('@save').should(({ response, status }) => {
      const { body } = response
      expect(status).to.eq(200)
      expect(body).to.have.all.keys('email', 'id', 'name')
    })
  })

  it('Create a same user and block', () => {
    cy.server()
    cy.route('POST', '**/api/users').as('save')

    cy.get('[data-cy=bt-create-account]').click()
    cy.get('[data-cy=name]').click().type(faker.name.findName())
    cy.get('[data-cy=email]').click().type(email)
    cy.get('[data-cy=password]').click().type(password)
    cy.get('.q-field__append').click()
    cy.get(':nth-child(24) > .q-btn > .q-btn__content > div').click()
    cy.get('[data-cy=btn-create]').click()
    cy.wait('@save').should(({ response, status }) => {
      const { body } = response
      expect(status).to.eq(400)
      expect(body).to.have.all.keys('errors', 'success')
    })
  })

  it('Should be sucess in login', () => {
    cy.visit('/')

    cy.get('[data-cy=email]').click().type(email)
    cy.get('[data-cy=password]').click().type(password)
    cy.get('[data-cy=bt-login]').click()

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq(`/profile`)
    })
  })
})
