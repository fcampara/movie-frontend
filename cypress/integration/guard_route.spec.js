context('Guard Route', () => {
  before(() => {
    cy.visit('/')
  })

  it('Try access profile', () => {
    cy.visit('/profile')

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/auth/')
    })
  })

  it('Try access Home', () => {
    cy.visit('/home')

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/auth/')
    })
  })

  it('Try access Suggestion', () => {
    cy.visit('/home/suggestions')

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/auth/')
    })
  })

  it('Try access My List', () => {
    cy.visit('/home/myList')

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/auth/')
    })
  })
})
