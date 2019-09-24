import faker from 'faker'

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
    cy.get('[data-cy=repassword]').should('be.visible')
    cy.get('[data-cy=birthDay]').should('be.visible')
    cy.get('[data-cy=btn-create]').should('be.visible')
  })

  it('Click in create and show errors if values is empty', () => {
    cy.get('[data-cy=btn-create]').click()
    cy.get('[data-cy=name]').parent().parent().should('have.class', 'text-negative')
    cy.get('[data-cy=email]').parent().parent().should('have.class', 'text-negative')
    cy.get('[data-cy=password]').parent().parent().should('have.class', 'text-negative')
    cy.get('[data-cy=repassword]').parent().parent().should('have.class', 'text-negative')
    cy.get('[data-cy="birthDay"] > div').parent().parent().should('have.class', 'text-negative')
    cy.get('[data-cy=btn-create]').should('be.visible')
  })
})
