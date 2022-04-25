import {shopping} from "../support/page_object/shoppingPage"

describe('Shopping Page automation', function() {
let testData
const mandatoryFields = [shopping.clientName,shopping.clientLastName,shopping.clientEmail
    ,shopping.clientAddress,
    shopping.selectRegion,shopping.clientCity,shopping.zipCode]

beforeEach(() => {
    cy.visit('https://automationteststore.com/')
})
this.beforeAll(() => {
    cy.fixture('testData').then(function (data) {
        testData = data
        return testData;
    })
})

function chooseCategoryAndAddItemToCart (category:string, items:string, position:number) {
    cy.get(shopping.navMenu).contains(category).click()
    cy.contains(items, {force: true}).click({force: true})
    cy.get(shopping.sortItems).select("Date New > Old")
    cy.get(shopping.productCart).eq(position).invoke('text').then( itemText => {
        cy.get(shopping.productCart).eq(position).click()
        cy.get(shopping.productName).find('span').should('have.text', itemText)
        cy.get(shopping.productPrice).then(($price) => {
        const itemPrice = $price.text().trim()
        cy.get(shopping.itemForm).find('select').children().then(($options) => {
  const randomOption = Math.floor(Math.random() * $options.length);
  cy.get(shopping.itemForm).find('select').select(`${$options[randomOption].textContent.trim()}`)
        })
        cy.get(shopping.cartTotal).then(($cartTotalValue) => {
           const cartTotal = $cartTotalValue.text().trim()
        cy.contains(shopping.addToCartButtonText).click()
        cy.contains(testData.emptyShoppingCartMsg).should('not.exist')
            let totalPrice = parseFloat(itemPrice.slice(1)) + parseFloat(cartTotal.slice(1))
            cy.get(shopping.cartTotal).should('have.text', "$" + totalPrice.toFixed(2).toString())
    })
        cy.get('a').contains(itemText)
})
    })
}

function searchForTheProductAndAddItemToCart (productName:string) {
    cy.get(shopping.searchInput).type(productName)
    .type('{enter}')
    cy.get(shopping.productCart).first().invoke('text').then( itemText => {
        cy.get(shopping.productCart).first().click()
        cy.get(shopping.productName).find('span').should('have.text', itemText)
        cy.get(shopping.cartTotal).then(($cartTotalValue) => {
            const cartTotal = $cartTotalValue.text().trim()
        cy.get(shopping.productPrice).then(($price) => {
            const itemPrice = $price.text().trim()
            cy.contains(shopping.addToCartButtonText).click()
            let totalPrice = parseFloat(itemPrice.slice(1)) + parseFloat(cartTotal.slice(1))
            cy.get(shopping.cartTotal).should('have.text', "$" + totalPrice.toFixed(2).toString())
        })
        })
        cy.contains(testData.emptyShoppingCartMsg).should('not.exist')
        cy.get('a').contains(itemText)
})
}

function fillClientDataToCompleteOrder (name:string, lastname:string, email:string,
     address:string, country:string, region:string, city:string, postCode:string) {
    cy.get(shopping.clientName).type(name)
    cy.get(shopping.clientLastName).type(lastname)
    cy.get(shopping.clientEmail).type(email)
    cy.get(shopping.clientAddress).type(address)
    cy.get(shopping.selectCountry).select(country)
    cy.get(shopping.selectRegion).select(region)
    cy.get(shopping.clientCity).type(city)
    cy.get(shopping.zipCode).type(postCode)
}

function checkIfDataIsValidated (name:string, lastname:string, email:string, address:string,
     city:string, postCode:string) {
    cy.get(shopping.clientName).type(name)
    cy.get(shopping.clientLastName).type(lastname)
    cy.get(shopping.clientEmail).type(email)
    cy.get(shopping.clientAddress).type(address)
    cy.get(shopping.clientCity).type(city)
    cy.get(shopping.zipCode).type(postCode)
}

it ('Add items to cart and finalize order', function(){
    chooseCategoryAndAddItemToCart("Apparel & accessories", "Shoes", 0);
    chooseCategoryAndAddItemToCart("Apparel & accessories", "T-shirts", 0);
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

it ('Add items to cart and put incorrect address values', function(){
    chooseCategoryAndAddItemToCart("Apparel & accessories", "Shoes", 0);
    cy.get(shopping.goToCheckout).click()
    cy.get('[type="radio"]').check('guest')
    cy.get(shopping.continueButton).click()
    checkIfDataIsValidated("J", "2", testData.incorrectEmail, "a", "X", "1")
    cy.get(shopping.continueButton).click()
            mandatoryFields.forEach((field) => {
                cy.get(field).should('have.css', 'border-color', 'rgb(169, 68, 66)')
              });
})

})