describe('Contact Us page - automation', function() {
    let testData;

beforeEach(() => {
    cy.visit('/Contact-Us/contactus.html')
    cy.fixture('testData').then(function (data) {
        testData = data
        return testData;
    })
})

it ('Fill all fields and clear them correctly', function(){
    cy.fillContactUsFields(testData.firstName, testData.lastName,
    testData.email, testData.comments)
    cy.get('input[value="RESET"]').click()
    cy.get('input[placeholder="First Name"]').should('have.value', '')
    cy.get('input[placeholder="Last Name"]').should('have.value', '')
    cy.get('input[placeholder="Email Address"]').should('have.value', '')
    cy.get('textarea[placeholder="Comments"]').should('have.value', '')
})

it ('Fill part of the fields and check error message', function(){
    cy.get('input[placeholder="First Name"]').type(testData.firstName)
    cy.get('input[value="SUBMIT"]').click()
    cy.get('body').contains("Error: all fields are required")
})

it ('Invalid email and check error message', function(){
    cy.fillContactUsFields(testData.firstName, testData.lastName,
        testData.incorrectEmail, testData.comments)
    cy.get('input[value="SUBMIT"]').click()
    cy.get('body').contains("Error: Invalid email address")
})

it ('Fill correct data and check message', function(){
    cy.fillContactUsFields(testData.firstName, testData.lastName,
        testData.email, testData.comments)
    cy.get('input[value="SUBMIT"]').click()
    cy.get('h1').contains("Thank You for your Message!")
})
})