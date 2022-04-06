Cypress.Commands.add('fillContactUsFields', (firstName, lastName, email, comments) => {
    cy.get('input[placeholder="First Name"]').type(firstName)
    cy.get('input[placeholder="Last Name"]').type(lastName)
    cy.get('input[placeholder="Email Address"]').type(email)
    cy.get('textarea[placeholder="Comments"]').type(comments)
})
