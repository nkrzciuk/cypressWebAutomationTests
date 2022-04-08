describe('Contact Us page - automation', function() {
    let testData;

beforeEach(() => {
    cy.visit('/Autocomplete-TextField/autocomplete-textfield.html')
    cy.fixture('testData').then(function (data) {
        testData = data
        return testData;
    })
})

it ('autocomplete text field and pick specific value', function(){
        cy.get('[id=myInput]').type("chi")
        cy.get('div').contains(testData.autocompleteValue.slice(3)).click()
        cy.get('[id=myInput]').should('have.value', testData.autocompleteValue)
        cy.get('[id=submit-button]').click()
})

it ('autocomplete text field and pick first value', function(){
    cy.get('[id=myInput]').type("chi")
    cy.get('[id=myInputautocomplete-list]').find('div').first().invoke('text').then( autocompleteVal => {
        cy.contains(autocompleteVal.slice(3)).click()
        cy.get('[id=myInput]').should('have.value', autocompleteVal)
    })
    cy.get('[id=submit-button]').click()
}) 
})