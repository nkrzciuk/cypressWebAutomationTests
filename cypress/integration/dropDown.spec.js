describe('DROPDOWN, CHECKBOXE(S) & RADIO BUTTON(S) - automation', function() {
    let testData;
    let firstDropdown = ['JAVA', 'C#', 'Python', 'SQL']
    let secondDropdown = ['Eclipse', 'Maven', 'TestNG', 'JUnit']
    let thirdDropdown = ['HTML', 'CSS', 'JavaScript', 'JQuery']
    let radioButtonsValues = ['green', 'blue', 'yellow', 'orange', 'purple']

beforeEach(() => {
    cy.visit('/Dropdown-Checkboxes-RadioButtons/index.html')
    cy.fixture('testData').then(function (data) {
        testData = data
        return testData;
    })
})
it ('Check values from first dropdown list', function(){
    firstDropdown.forEach((option) => {
        cy.get('[id=dropdowm-menu-1]')
        .select(option)
        .invoke('val')
        .should('deep.equal', option.toLowerCase())
      });
})
it ('Check values from second dropdown list', function(){
    secondDropdown.forEach((option) => {
        cy.get('[id=dropdowm-menu-2]')
        .select(option)
        .invoke('val')
        .should('deep.equal', option.toLowerCase())
      });
})

it ('Check values from third dropdown list', function(){
    thirdDropdown.forEach((option) => {
        cy.get('[id=dropdowm-menu-3]')
        .select(option)
        .invoke('val')
        .should('deep.equal', option.toLowerCase())
      });
})

it ('Checkboxes 2 and 4 unchecked correctly', function(){
    cy.get('[type="checkbox"]').check().should('be.checked')
    cy.get('[type="checkbox"]').uncheck(['option-2', 'option-4']).should('not.be.checked')
})

it ('Radio buttons, click and check', function(){
    radioButtonsValues.forEach((value) => {
        cy.get('[type="radio"]').check(value).should('be.checked').and('have.value', value)
    })
})

})