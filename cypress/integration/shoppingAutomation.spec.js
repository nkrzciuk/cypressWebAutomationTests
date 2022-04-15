import { func } from "assert-plus"
import {shopping} from "../support/page_object/shoppingPage"

describe('Shopping Page automation', function() {
let testData

beforeEach(() => {
    cy.visit('https://automationteststore.com/')
})
this.beforeAll(() => {
    cy.fixture('testData').then(function (data) {
        testData = data
        return testData;
    })
})

function chooseCategoryAndAddItemToCart (category, items, size) {
    cy.get(shopping.navMenu).contains(category).click()
    cy.contains(items, {force: true}).click({force: true})
    cy.get(shopping.sortItems).select("Date New > Old")
    cy.get(shopping.productCart).first().invoke('text').then( itemText => {
        cy.get(shopping.productCart).first().click()
        cy.get(shopping.productName).find('span').should('have.text', itemText)
        cy.get(shopping.itemForm).find('select').select(size)
        cy.contains(shopping.addToCartButtonText).click()
        cy.contains(testData.emptyShoppingCartMsg).should('not.exist')
        cy.get('a').contains(itemText)
})
}

function searchForTheProductAndAddItemToCart (productName) {
    cy.get(shopping.searchInput).type(productName)
    .type('{enter}')
    cy.get(shopping.productCart).first().invoke('text').then( itemText => {
        cy.get(shopping.productCart).first().click()
        cy.get(shopping.productName).find('span').should('have.text', itemText)
        // cy.get(shopping.itemForm).find('select').select(size)
        cy.contains(shopping.addToCartButtonText).click()
        cy.contains(testData.emptyShoppingCartMsg).should('not.exist')
        cy.get('a').contains(itemText)
})
}

function fillClientDataToCompleteOrder (name, lastname, email, address, country, region, city, postCode) {
    cy.get(shopping.clientName).type(name)
    cy.get(shopping.clientLastName).type(lastname)
    cy.get(shopping.clientEmail).type(email)
    cy.get(shopping.clientAddress).type(address)
    cy.get(shopping.selectCountry).select(country)
    cy.get(shopping.selectRegion).select(region)
    cy.get(shopping.clientCity).type(city)
    cy.get(shopping.zipCode).type(postCode)
}

it ('Add items to cart and finalize order', function(){
    chooseCategoryAndAddItemToCart("Apparel & accessories", "Shoes", "39");
    chooseCategoryAndAddItemToCart("Apparel & accessories", "T-shirts", "Large");
    searchForTheProductAndAddItemToCart(testData.cosmeticNameSearch);
    cy.get(shopping.goToCheckout).click()
    cy.get('[type="radio"]').check('guest')
    cy.get(shopping.continueButton).click()
    fillClientDataToCompleteOrder(testData.firstName, testData.lastName, testData.email, testData.address, 
        testData.country, testData.region, testData.city, testData.postCode)
    cy.get(shopping.continueButton).click()
    cy.get(shopping.confirmOrderButton).click()
    cy.get(shopping.orderConfirmationMsg).should('have.text', testData.successfullOrderMsg)

})

})