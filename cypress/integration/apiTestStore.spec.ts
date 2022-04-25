describe('API testing STORE', function() {
    let testData;
    const currentDate = new Date()
    const storeURL = 'https://petstore.swagger.io/v2/store/'

this.beforeAll(() => {
    cy.fixture('testData').then(function (data) {
        testData = data
        return testData;
    })
})

function addPetToTheStore (dogName : string, idNo: number) {
    cy.request({
        method: 'POST',
        url: 'https://petstore.swagger.io/v2/pet/',
        body: {
            name: dogName,
            photoUrls: ['imageURL'],
            id: idNo
        }
    }).then(
        (response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('name', dogName)
        })
}


it ('Place an order for the pet', function(){
    addPetToTheStore(testData.dog1Name, testData.dogID)
    cy.request({
        method: 'POST',
        url: storeURL + "order",
        body: {
            id: 1,
            petId: testData.dogID,
            quantity: testData.petQuantity,
            shipDate: currentDate.toISOString(),
            status: "placed",
            complete: true
          }
        }).then(
        (response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('id', 1)
          expect(response.body).to.have.property('quantity', testData.petQuantity)
          expect(response.body).to.have.property('complete', true)
          expect(response.body).to.have.property('status', 'placed')

        })
})

it ('Find order by ID', function(){
    cy.request({
        method: 'POST',
        url: storeURL + 'order', 
        body: {
            id: testData.orderID,
            petId: testData.dogID,
            quantity: testData.petQuantity,
            shipDate: currentDate.toISOString(),
            status: 'placed',
            complete: true
          }
        })
    cy.request({
        method: 'GET', 
        url: storeURL+ 'order/' + testData.orderID, 
        body: {}
    }).then( (response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('id', testData.orderID)
          expect(response.body).to.have.property('status', 'placed')
          expect(response.body).to.have.property('petId', testData.dogID)
    })
})

it ('Delete order by ID', function(){
    cy.request({
        method: 'POST',
        url: storeURL + 'order',
        body: {
            id: testData.orderID,
            petId: testData.dogID,
            quantity: testData.petQuantity,
            shipDate: currentDate.toISOString(),
            status: 'placed',
            complete: true
        }
        })
    cy.request({
        method: 'DELETE',
        url: storeURL+ 'order/' + testData.orderID,
        body: {}
    }).then( (response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('message', testData.orderID.toString())
    })
})

it ('Return store inventory by pet status', function(){
    cy.request({
        method: 'GET',
        url: storeURL + 'inventory/',
        body: {}
    }).then( (response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('available')
          expect(response.body).to.have.property('pending')
          expect(response.body).to.have.property('sold')
    })
})

})