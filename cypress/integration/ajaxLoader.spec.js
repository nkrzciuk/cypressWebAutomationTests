describe('AJAX loader', function() {

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
      })

beforeEach(() => {
    cy.visit('/Ajax-Loader/index.html')
})

it ('Wait until spinner is invisible', function(){
    cy.get('[id=loader', { timeout: 20000 }).should("not.be.visible")
    cy.get('[id=button1]').click()
    cy.contains('Well Done For Waiting....!!!').should("be.visible")
})

it ('Wait until spinner has new attribute with specific value', function(){
    cy.get('[id=loader]', { timeout: 20000 }).should('have.attr', 'style', 'display: none;')
    cy.get('[id=button1]').click()
    cy.contains('Well Done For Waiting....!!!').should("be.visible")
})

})