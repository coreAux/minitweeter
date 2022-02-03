describe('MiniTweeter', function() {
  it('front page can be opened', function() {
    cy.visit('http://localhost:8000')
    cy.contains('MiniTweeter')
    cy.contains('curious about the code')
  })
})
