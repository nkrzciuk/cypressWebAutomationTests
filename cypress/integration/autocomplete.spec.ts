import {autocompleteElements} from "../support/page_object/autocompletePage"

describe('Autocomplete field - automation', function() {
    let testData: { autocompleteValue: string; };

this.beforeAll(() => {
    cy.visit('/Autocomplete-TextField/autocomplete-textfield.html')
    cy.fixture('testData').then(function (data) {
        testData = data
        return testData;
    })
})

it ('autocomplete text field and pick specific value', function(){
        cy.get(autocompleteElements.inputField).type("chi")
        cy.get('div').contains(testData.autocompleteValue.slice(3)).click()
        cy.get(autocompleteElements.inputField).should('have.value', testData.autocompleteValue)
        cy.get(autocompleteElements.submitButton).click()
})

it ('autocomplete text field and pick first value', function(){
    cy.get(autocompleteElements.inputField).type("chi")
    cy.get(autocompleteElements.autocompleteList).find('div').first().invoke('text').then( autocompleteVal => {
        cy.contains(autocompleteVal.slice(3)).click()
        cy.get(autocompleteElements.inputField).should('have.value', autocompleteVal)
    })
    cy.get(autocompleteElements.submitButton).click()
}) 
})