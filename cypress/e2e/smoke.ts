describe('Smoke', () => {
  it('visit home page', () => {
    cy.visit('/')
    cy.findByAltText('Logo');
  })
})
