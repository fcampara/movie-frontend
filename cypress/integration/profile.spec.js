import faker from 'faker'

const email = faker.internet.email()
const password = faker.internet.password()

context('Guard Route', () => {
  before(() => {
    cy.visit('/')

    cy.server()
    cy.route('POST', '**/api/users').as('save')

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
  })

  it('Should be create a profile', () => {
    cy.server()
    cy.route('POST', '**/api/users/profiles').as('saveProfile')

    cy.get('[data-cy=new-profile]').click()

    cy.get('[data-cy=name]').click().type(faker.name.findName())
    cy.get('[data-cy=btn-save]').click()
    cy.wait('@saveProfile').should(({ response, status }) => {
      const { body } = response
      expect(status).to.eq(200)
      expect(body).to.have.all.keys('success', 'data')
      expect(body.data).to.have.all.keys('id', 'name', 'userId', 'updatedAt', 'createdAt')
    })
  })

  it('Create more 4 and block because limit', () => {
    cy.server()
    cy.route('POST', '**/api/users/profiles').as('saveProfile')

    cy.get('[data-cy=new-profile]').click()

    cy.get('[data-cy=name]').click().type(faker.name.findName())
    cy.get('[data-cy=btn-save]').click()
    cy.wait('@saveProfile').should(({ response, status }) => {
      const { body } = response
      expect(status).to.eq(200)
      expect(body).to.have.all.keys('success', 'data')
      expect(body.data).to.have.all.keys('id', 'name', 'userId', 'updatedAt', 'createdAt')
    })

    cy.get('[data-cy=new-profile]').click()

    cy.get('[data-cy=name]').click().type(faker.name.findName())
    cy.get('[data-cy=btn-save]').click()
    cy.wait('@saveProfile').should(({ response, status }) => {
      const { body } = response
      expect(status).to.eq(200)
      expect(body).to.have.all.keys('success', 'data')
      expect(body.data).to.have.all.keys('id', 'name', 'userId', 'updatedAt', 'createdAt')
    })

    cy.get('[data-cy=new-profile]').click()

    cy.get('[data-cy=name]').click().type(faker.name.findName())
    cy.get('[data-cy=btn-save]').click()
    cy.wait('@saveProfile').should(({ response, status }) => {
      const { body } = response
      expect(status).to.eq(200)
      expect(body).to.have.all.keys('success', 'data')
      expect(body.data).to.have.all.keys('id', 'name', 'userId', 'updatedAt', 'createdAt')
    })

    cy.get('[data-cy=new-profile]').click()

    cy.get('[data-cy=name]').click().type(faker.name.findName())
    cy.get('[data-cy=btn-save]').click()
    cy.wait('@saveProfile').should(({ response, status }) => {
      const { body } = response
      expect(status).to.eq(400)
      expect(body).to.have.all.keys('success', 'errors')
    })

    cy.get('[data-cy=btn-cancel]').click()
  })

  it('Delete profiles', () => {
    cy.server()
    cy.route('DELETE', '**/api/users/profiles/**').as('deleteProfile')

    cy.get('[data-cy=delete-3]').click()
    cy.wait('@deleteProfile').should(({ response, status }) => {
      const { body } = response
      expect(status).to.eq(200)
      expect(body).to.have.all.keys('success', 'data')
    })

    cy.get('[data-cy=delete-2]').click()
    cy.wait('@deleteProfile').should(({ response, status }) => {
      const { body } = response
      expect(status).to.eq(200)
      expect(body).to.have.all.keys('success', 'data')
    })

    cy.get('[data-cy=delete-1]').click()
    cy.wait('@deleteProfile').should(({ response, status }) => {
      const { body } = response
      expect(status).to.eq(200)
      expect(body).to.have.all.keys('success', 'data')
    })
  })

  it('Access home with profile', () => {
    cy.get('.q-mt-md > .material-icons').click()
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/home')
    })
  })
})
