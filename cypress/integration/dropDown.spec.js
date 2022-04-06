describe('DROPDOWN, CHECKBOXE(S) & RADIO BUTTON(S) - automation', function() {
    let testData;
    let firstDropdown = ['JAVA', 'C#', 'Python', 'SQL']
    let secondDropdown = ['Eclipse', 'Maven', 'TestNG', 'JUnit']
    let thirdDropdown = ['HTML', 'CSS', 'JavaScript', 'JQuery']

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
    secondDropdown.forEach((option) => {
        cy.get('[id=dropdowm-menu-2]')
        .select(option)
        .invoke('val')
        .should('deep.equal', option.toLowerCase())
      });
})
})