describe('Date Picker - automation', function() {

beforeEach(() => {
    cy.visit('/Datepicker/index.html')
})

it ('Pick date and check if it is correct', function(){
    let date = new Date()
    date.setDate(date.getDate() + 15)
    let futureDay = date.getDate()
    let futureMonth = date.toLocaleString('default', { month: 'long' });
    let displayedDate = ('0'+date.toLocaleString('default', { month: 'numeric' })).slice(-2) + "-"
     + ("0" + futureDay).slice(-2) + "-" + date.getFullYear()

    cy.get('[id=datepicker]').find('input').then( input => {
      cy.wrap(input).click()
      cy.get('[class="datepicker-switch"]').invoke('text').then( monthText => {
        if(!monthText.includes(futureMonth)) {
            cy.get('th[class="next"]:visible').click()
        } 
        cy.get('[class="day"]').contains(futureDay).click()

    })
            cy.wrap(input).invoke('prop', 'value').should('contain', displayedDate)
        })
})

})