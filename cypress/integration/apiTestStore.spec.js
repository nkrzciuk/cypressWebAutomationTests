describe('API testing STORE', function() {
    let testData;
    const currentDate = new Date()
    const storeURL = "https://petstore.swagger.io/v2/store/"

this.beforeAll(() => {
    cy.fixture('testData').then(function (data) {
        testData = data
        return testData;
    })
})

function addPetToTheStore (dogName, idNo) {
    cy.request('POST', "https://petstore.swagger.io/v2/pet/" , { name: dogName, "photoUrls": [
        "imageURL"], id: idNo}).then(
        (response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('name', dogName)
        })
}


it ('Place an order for the pet', function(){
    addPetToTheStore(testData.dog1Name, testData.dogID)
    cy.request('POST', storeURL + "order", { id: 1, petId: testData.dogID, quantity: testData.petQuantity,
    shipDate: currentDate.toISOString(), status: "placed", complete: true}).then(
        (response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('id', 1)
          expect(response.body).to.have.property('quantity', testData.petQuantity)
          expect(response.body).to.have.property('complete', true)
          expect(response.body).to.have.property('status', 'placed')

        })
})

it ('Find order by ID', function(){
    cy.request('POST', storeURL + "order", { id: testData.orderID, petId: testData.dogID, quantity: testData.petQuantity,
        shipDate: currentDate.toISOString(), status: "placed", complete: true})
    cy.request('GET', storeURL+ "order/" + testData.orderID, {}).then( (response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('id', testData.orderID)
          expect(response.body).to.have.property('status', 'placed')
          expect(response.body).to.have.property('petId', testData.dogID)
    })
})

it ('Delete order by ID', function(){
    cy.request('POST', storeURL + "order", { id: testData.orderID, petId: testData.dogID, quantity: testData.petQuantity,
        shipDate: currentDate.toISOString(), status: "placed", complete: true})
    cy.request('DELETE', storeURL+ "order/" + testData.orderID, {}).then( (response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('message', testData.orderID.toString())
    })
})

it ('Return store inventory by pet status', function(){
    cy.request('GET', storeURL+ "inventory/", {}).then( (response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('available')
          expect(response.body).to.have.property('pending')
          expect(response.body).to.have.property('sold')
    })
})

})