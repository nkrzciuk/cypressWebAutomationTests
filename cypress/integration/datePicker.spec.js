import {dateElements} from "../support/page_object/datePickerPage"

describe('Date Picker - automation', function() {

beforeEach(() => {
    cy.visit('/Datepicker/index.html')
})

it ('Pick date and check if it is correct', function(){
    const date = new Date()
    date.setDate(date.getDate() + 15)
    const futureDay = date.getDate()
    const futureMonth = date.toLocaleString('default', { month: 'long' });
    const displayedDate = ('0'+date.toLocaleString('default', { month: 'numeric' })).slice(-2) + "-"
     + ("0" + futureDay).slice(-2) + "-" + date.getFullYear()

    cy.get(dateElements.datePickerField).find('input').then( input => {
      cy.wrap(input).click()
      cy.get(dateElements.monthHeader).invoke('text').then( monthText => {
        if(!monthText.includes(futureMonth)) {
            cy.get(dateElements.switchToNextMonth).click()
        } 
        cy.get(dateElements.singleDayField).contains(futureDay).click()

    })
            cy.wrap(input).invoke('prop', 'value').should('contain', displayedDate)
        })
})

})