describe('API testing STORE', function() {
    let testData;
    const userURL = 'https://petstore.swagger.io/v2/user/'

this.beforeAll(() => {
    cy.fixture('testData').then(function (data) {
        testData = data
        return testData;
    })
})

function createUser (username:string, firstName:string, lastName:string, email:string,
     password:string, phone:string, userStatus:number) {
    cy.request({
        method: 'POST',
        url: userURL + "createWithArray",
        body: [{
            id: 1,
            username: username,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            phone: phone,
            userStatus: userStatus
          }]
        })
        .then(
        (response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('message', 'ok')
        })

}


it ('Create a user', function(){
    createUser(testData.username, testData.firstName, testData.lastName, testData.email,
         testData.userPassword, testData.userPhone, 1)
})

it ('Get user by username', function(){
    createUser(testData.username, testData.firstName, testData.lastName, testData.email,
        testData.userPassword, testData.userPhone, 1)
    cy.request({
        method: 'GET', 
        url: userURL + testData.username, 
        body: {}
    }).then( (response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('username', testData.username)
          expect(response.body).to.have.property('firstName', testData.firstName)
          expect(response.body).to.have.property('lastName', testData.lastName)
    })
})

it ('Update user by userName', function(){
    createUser(testData.username, testData.firstName, testData.lastName, testData.email,
        testData.userPassword, testData.userPhone, 1)
    cy.request({
        method: 'PUT',
        url: userURL + testData.username,
        body: {
            id: 1,
            username: testData.username,
            firstName: testData.firstName,
            lastName: testData.lastName,
            email: testData.updatedEmail,
            password: testData.userPassword,
            phone: testData.userPhone,
            userStatus: 1
        }
        })
        cy.request({
            method: 'GET', 
            url: userURL + testData.username, 
            body: {}
        }).then( (response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('username', testData.username)
            expect(response.body).to.have.property('email', testData.updatedEmail)
            expect(response.body).to.have.property('firstName', testData.firstName)
            expect(response.body).to.have.property('lastName', testData.lastName)
      })
})

it ('Delete user by username', function(){
    createUser(testData.username, testData.firstName, testData.lastName, testData.email,
        testData.userPassword, testData.userPhone, 1)
    cy.request({
        method: 'DELETE', 
        url: userURL + testData.username, 
        body: {}
    }).then( (response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('message', testData.username)
    })
})

it ('Login user', function(){
    createUser(testData.username, testData.firstName, testData.lastName, testData.email,
        testData.userPassword, testData.userPhone, 1)
    cy.request({
        method: 'GET', 
        url: userURL + "login?username=" + testData.username + "&password=" + testData.userPassword, 
        body: {}
    }).then( (response) => {
          expect(response.status).to.eq(200)
    })
})

it ('Logout user', function(){
    createUser(testData.username, testData.firstName, testData.lastName, testData.email,
        testData.userPassword, testData.userPhone, 1)
    cy.request({
        method: 'GET', 
        url: userURL + "login?username=" + testData.username + "&password=" + testData.userPassword, 
        body: {}
    }).then( (response) => {
          expect(response.status).to.eq(200)
          cy.request({
            method: 'GET', 
            url: userURL + "login?username=" + testData.username + "&password=" + testData.userPassword, 
            body: {}
        })
    })
    cy.request({
        method: 'GET', 
        url: userURL + "logout", 
        body: {}
    }).then( (response) => {
          expect(response.status).to.eq(200)
    })
})

})