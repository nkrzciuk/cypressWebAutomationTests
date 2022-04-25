import {ajaxElements} from "../support/page_object/ajaxPage"

describe('AJAX loader', function() {

    Cypress.on('uncaught:exception', (err, runnable) => {
        if (err.message.includes('Unexpected token')) {
            return false
          }
      })

beforeEach(() => {
    cy.visit('/Ajax-Loader/index.html')
})

it ('Wait until spinner is invisible', function(){
    cy.get(ajaxElements.loader, { timeout: 20000 }).should("not.be.visible")
    cy.get(ajaxElements.clickMeButton).click()
    cy.contains(ajaxElements.confirmationPop).should("be.visible")
})

it ('Wait until spinner has new attribute with specific value', function(){
    cy.get(ajaxElements.loader, { timeout: 20000 }).should('have.attr', 'style', 'display: none;')
    cy.get(ajaxElements.clickMeButton).click()
    cy.contains(ajaxElements.confirmationPop).should("be.visible")
})

})