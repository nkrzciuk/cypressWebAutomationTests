import {contactUsElements} from "../support/page_object/contactUsPage"

describe('Contact Us page - automation', function() {
    let testData;


beforeEach(() => {
    cy.visit('/Contact-Us/contactus.html')
})

this.beforeAll(() => {
    cy.fixture('testData').then(function (data) {
        testData = data
        return testData;
    })
})

it ('Fill all fields and clear them correctly', function(){
    cy.fillContactUsFields(testData.firstName, testData.lastName,
    testData.email, testData.comments)
    cy.get(contactUsElements.buttonReset).click()
    cy.get(contactUsElements.firstName).should('have.value', '')
    cy.get(contactUsElements.lastName).should('have.value', '')
    cy.get(contactUsElements.email).should('have.value', '')
    cy.get(contactUsElements.comments).should('have.value', '')
})

it ('Fill part of the fields and check error message', function(){
    cy.get(contactUsElements.firstName).type(testData.firstName)
    cy.get(contactUsElements.buttonSubmit).click()
    cy.get('body').contains("Error: all fields are required")
})

it ('Invalid email and check error message', function(){
    cy.fillContactUsFields(testData.firstName, testData.lastName,
        testData.incorrectEmail, testData.comments)
    cy.get(contactUsElements.buttonSubmit).click()
    cy.get('body').contains("Error: Invalid email address")
})

it ('Fill correct data and check message', function(){
    cy.fillContactUsFields(testData.firstName, testData.lastName,
        testData.email, testData.comments)
    cy.get(contactUsElements.buttonSubmit).click()
    cy.get(contactUsElements.thankYouMsg).children('h1')
    .should('have.text', "Thank You for your Message!")
})
})