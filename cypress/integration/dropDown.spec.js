import {dropDownElements} from "../support/page_object/dropdownPage"

describe('DROPDOWN, CHECKBOXE(S) & RADIO BUTTON(S) - automation', function() {
    const firstDropdown = ['JAVA', 'C#', 'Python', 'SQL']
    const secondDropdown = ['Eclipse', 'Maven', 'TestNG', 'JUnit']
    const thirdDropdown = ['HTML', 'CSS', 'JavaScript', 'JQuery']
    const radioButtonsValues = ['green', 'blue', 'yellow', 'orange', 'purple']

this.beforeAll(() => {
    cy.visit('/Dropdown-Checkboxes-RadioButtons/index.html')
})

function compareActualValuesWithTestData(selectedDropdown, selectedList, numberOfValues) {
    cy.get(selectedDropdown).children().should('have.length', numberOfValues)
    cy.get(selectedDropdown).children()
   .each(($option, i) => {
        expect($option.text()).to.equal(selectedList[i]);
   });
}

   function checkIfOptionIsSelectedCorrectly(selectedList, selectedDropdown) {
    selectedList.forEach((option) => {
        cy.get(selectedDropdown)
        .select(option)
        .invoke('val')
        .should('deep.equal', option.toLowerCase())
      });
    }

it ('Check values from first dropdown list', function(){
    compareActualValuesWithTestData(dropDownElements.firstDropdown, firstDropdown, 4)
    checkIfOptionIsSelectedCorrectly(firstDropdown, dropDownElements.firstDropdown)
})

it ('Check values from second dropdown list', function(){
    compareActualValuesWithTestData(dropDownElements.secondDropdown, secondDropdown, 4)
    checkIfOptionIsSelectedCorrectly(secondDropdown, dropDownElements.secondDropdown)
})

it ('Check values from third dropdown list', function(){
    compareActualValuesWithTestData(dropDownElements.thirdDropdown, thirdDropdown, 4)
    checkIfOptionIsSelectedCorrectly(thirdDropdown, dropDownElements.thirdDropdown)
})

it ('Checkboxes 2 and 4 unchecked correctly', function(){
    cy.get(dropDownElements.checkbox).check().should('be.checked')
    cy.get(dropDownElements.checkbox).uncheck(['option-2', 'option-4']).should('not.be.checked')
})

it ('Radio buttons, click and check', function(){
    cy.get(dropDownElements.radioButtonForm).children('[type=radio]').should('have.length', 5)
    cy.get(dropDownElements.radioButtonForm).children('[type=radio]')
   .each(($input, i) => {
        expect($input.val()).to.equal(radioButtonsValues[i]);
   });
    radioButtonsValues.forEach((value) => {
        cy.get(dropDownElements.radioButton).check(value).should('be.checked').and('have.value', value)
    })
})

})