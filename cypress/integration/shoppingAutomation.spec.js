import {shopping} from "../support/page_object/shoppingPage"

describe('Shopping Page automation', function() {
let testData

beforeEach(() => {
    cy.visit('http://automationteststore.com/')
})
this.beforeAll(() => {
    cy.fixture('testData').then(function (data) {
        testData = data
        return testData;
    })
})

function chooseCategoryAndAddItemToCart (category, items) {
    cy.get(shopping.navMenu).contains(category).click()
    cy.contains(items, {force: true}).click({force: true})
    cy.get(shopping.productCart).first().invoke('text').then( itemText => {
        cy.get(shopping.productCart).first().click()
        cy.get(shopping.productName).find('span').should('have.text', itemText)
        if (items == "Shoes") {
            cy.get("[type='radio']").first().check()
        } else {

        }
        // cy.get("[type='radio']").first().check()
        cy.contains(shopping.addToCartButtonText).click()
        cy.contains(testData.emptyShoppingCartMsg).should('not.exist')
        cy.get('a').contains(itemText)
})
}

it ('Add items to cart and finalize order', function(){
    chooseCategoryAndAddItemToCart("Apparel & accessories", "Shoes");
    chooseCategoryAndAddItemToCart("Apparel & accessories", "T-shirts");
})

})