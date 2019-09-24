import faker from 'faker'

const email = faker.internet.email()
const password = faker.internet.password()
context('Movies', () => {
  before(() => {
    cy.visit('/')

    cy.server()
    cy.route('POST', '**/api/users').as('save')
    cy.route('POST', '**/api/users/profiles').as('saveProfile')

    cy.get('[data-cy=bt-create-account]').click()

    cy.get('[data-cy=name]').click().type(faker.name.findName())
    cy.get('[data-cy=email]').click().type(email)
    cy.get('[data-cy=password]').click().type(password)
    cy.get('.q-field__append').click()
    cy.get(':nth-child(24) > .q-btn > .q-btn__content > div').click()
    cy.get('[data-cy=btn-create]').click()
    cy.wait('@save')

    cy.get('[data-cy=email]').click().type(email)
    cy.get('[data-cy=password]').click().type(password)

    cy.get('[data-cy=bt-login]').click()

    cy.get('[data-cy=new-profile]').click()

    cy.get('[data-cy=name]').click().type(faker.name.findName())
    cy.get('[data-cy=btn-save]').click()
    cy.wait('@saveProfile')
    cy.get('.q-mt-md > .material-icons').click()
  })

  it('Check list is discovery is loaded', () => {
    cy.server()
    cy.route('GET', '**/3/discover/movie?*').as('discover')

    cy.visit('/')
    cy.wait('@discover').should(({ response, status }) => {
      const { body } = response
      expect(status).to.eq(200)
      expect(body).to.have.all.keys('page', 'results', 'total_pages', 'total_results')
      expect(body.results).to.have.lengthOf(20)
    })
  })

  it('Add movie to my list and check', () => {
    cy.server()
    cy.route('POST', '**/movies/**/myList').as('addMyList')

    cy.get(':nth-child(1) > :nth-child(2) > [data-cy=add-btn-list] > .q-btn__content > .material-icons').should('be.visible')
    cy.get(':nth-child(1) > :nth-child(2) > [data-cy=add-btn-list] > .q-btn__content > .material-icons').click()
    cy.wait(1000)
    cy.wait('@addMyList').should(({ response, status }) => {
      const { body } = response
      expect(status).to.eq(200)
      expect(body).to.have.all.keys('data', 'success')
      expect(body.data)
      .to.have.all
      .keys('id', 'movieId', 'wantWatch', 'createdAt', 'details', 'genres', 'movieName', 'profileId', 'scheduleTo', 'updatedAt', 'watched')
    })
    cy.get(':nth-child(1) > :nth-child(2) > [data-cy=add-btn-list] > .q-btn__content > .material-icons').should('not.be.visible')
  })

  it('Make movie watched', () => {
    cy.server()
    cy.route('PUT', '**/movies/**/watched/*').as('updateList')

    cy.get(':nth-child(1) > .q-card__actions > [data-cy=btn-watch-movie]').click()
    cy.wait('@updateList').should(({ response, status }) => {
      const { body } = response
      expect(status).to.eq(200)
      expect(body).to.have.all.keys('data', 'success')
      expect(body.data)
        .to.have.all
        .keys('id', 'movieId', 'wantWatch', 'createdAt', 'details', 'genres', 'movieName', 'profileId', 'scheduleTo', 'updatedAt', 'watched')
    })
    cy.get(':nth-child(1) > .q-card__actions > [data-cy=btn-watch-movie]').should('have.class', 'text-positive')
  })
})
