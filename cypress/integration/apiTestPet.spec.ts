describe('API testing PETS', function() {
    let testData;
    const petStoreURL = 'https://petstore.swagger.io/v2/pet/'

this.beforeAll(() => {
    cy.fixture('testData').then(function (data) {
        testData = data
        return testData;
    })
})


it ('Add new Pet to the store', function(){
    cy.request({
        method: 'POST',
        url: petStoreURL,
        body: {
            name: testData.dog1Name,
            photoUrls: ['imageURL']
        }
        }).then(
        (response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('name', testData.dog1Name)
        })
})

it ('Update existing pet in the store', function(){
    cy.request({
        method: 'POST',
        url: petStoreURL,
        body: {
            name: testData.dog1Name,
            photoUrls: ['imageURL'],
            id: testData.dogID
        }
    }).then(
        (response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('id', testData.dogID)
          expect(response.body).to.have.property('name', testData.dog1Name)
          cy.request({
              method: 'PUT',
              url: petStoreURL,
              body: {
                  id: response.body.id,
                  name: testData.dog2Name,
                  photoUrls: ['imageURL']
              }
                }).then(
        (updatedResponse) => {
            expect(updatedResponse.status).to.eq(200)
            expect(updatedResponse.body).to.have.property('id', response.body.id)
            expect(updatedResponse.body).to.have.property('name', testData.dog2Name)
        })
        })
})

it ('Find pet by id', function(){
    cy.request({
        method: 'POST',
        url: petStoreURL,
        body: {
            name: testData.dog1Name,
            photoUrls: ['imageURL'],
            id: testData.dogID
        }
        }).then(
        (response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('name', testData.dog1Name)
          const responseID = response.body.id
          cy.request({
              method: 'GET',
              url: petStoreURL + responseID,
              body: {}
            }).then(
        (updatedResponse) => {
            expect(updatedResponse.status).to.eq(200)
            expect(updatedResponse.body).to.have.property('id', responseID)
            expect(updatedResponse.body).to.have.property('name', testData.dog1Name)
        })
        })
})

it ('Find pet by status', function(){
    cy.request({
        method: 'POST',
        url: petStoreURL,
        body: {
            name: testData.dog1Name,
            photoUrls: ['imageURL'],
            id: testData.dogID,
            status: 'sold'
        }
        }).then(
        (response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('id', testData.dogID)
          expect(response.body).to.have.property('name', testData.dog1Name)
          cy.request({
              method: 'GET',
              url: petStoreURL + 'findByStatus?status=' + response.body.status,
              body: {}
            }).then(
        (updatedResponse) => {
            expect(updatedResponse.status).to.eq(200)
            expect(response.body).to.not.be.null
            expect(updatedResponse.body[1]).to.have.property('status', response.body.status)
        })
        })
    })
it ('Delete pet by ID', function(){
    cy.request({
        method: 'POST',
        url: petStoreURL,
        body: {
            name: testData.dog1Name,
            photoUrls: ['imageURL'],
            id: testData.dogID
        }
        }).then(
        (response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('id', testData.dogID)
          expect(response.body).to.have.property('name', testData.dog1Name)
          const responseID = response.body.id
          cy.request({
              method: 'DELETE',
              url: petStoreURL + responseID,
              body: {}
            }).then(
        (updatedResponse) => {
            expect(updatedResponse.status).to.eq(200)
            expect(updatedResponse.body).to.have.property('message', responseID.toString())
        })
        })
}) 
})