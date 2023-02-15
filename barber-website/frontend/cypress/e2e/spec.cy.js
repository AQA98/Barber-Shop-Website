

describe('test cypress is working ', () => {
  it('test true equal true', () => {
    expect(true).to.equal(true);
  })

})


describe('Test UserStories', () => {
  const WAIT_TIME = 1000;
  const MODIFIED_PASS = 'modifiedPass';
  //a testing admin account should already in the database before starting
  const TestAdminInfo = {
    Telephone: 1111111111,
    Password: "modifiedPass"
  }

  // a barber account don't have to be in the database in advance
  const TestBarberInfo = {
    Telephone: 1111111112,
    Password: "testBarberPass",
    Email: 'e2ebarber490@gmail.com',
    FirstName: 'BarberFirst',
    LastName: 'BarberLast'
  }

  const TestUserInfo = {
    Telephone: 1111111113,
    Password: "testCustomerPass",
    Email: 'e2ecustomer490@gmail.com',
    FirstName: 'CustomerFirst',
    LastName: 'CustomerLast'
  }
  const ModifiedBarberInfo = {
    Email: 'e2ebarberModified@gmail.com',
    FirstName: 'BarberFirstM',
    LastName: 'BarberLastM'
  }
  const clickIcon = () => {
    cy.get('.v-toolbar__content > [role="button"]').click();
  }

  // a function to click login
  const clickSignIn = () => {
    clickIcon();
    //cy.get('.row > .v-btn').click();
    clickButtonWith("sign in")
  }
  // a function for login
  const loginAccount = (account) => {
    cy.visit('/');

    clickSignIn();
    // cy.get(':nth-child(2) > .col > .v-input > .v-input__control > .v-input__slot').type(account.Telephone);
    // cy.get('.v-text-field__slot>[type="password"]').type(account.Password);
    completeFiledWithPlaceHolder("Phone Number", account.Telephone);
    completeFiledWithPlaceHolder("Password", account.Password);
    cy.get('.mt-8').last().click();
  }

  // a function to fill the form 
  const completeField = (nth, input) => {
    cy.get(`:nth-child(${nth}) > .col > .v-input > .v-input__control > .v-input__slot`)
      .last()
      .type(input);
  }
  const completeUserInfo = (nth, input) => {
    cy.get(`:nth-child(${nth}) > :nth-child(1) > .v-input > .v-input__control > .v-input__slot`)
      .last()
      .type("{backspace}".repeat(50) + input)
  }

  const completeFiledWithPlaceHolder = (placeHolder, input) => {
    cy.get(`input[placeholder="${placeHolder}"]`)
      .last().type(input);

  }
  const completeSignupData = (data) => {
    completeFiledWithPlaceHolder("First Name", data.FirstName);
    completeFiledWithPlaceHolder("Last Name", data.LastName);
    completeFiledWithPlaceHolder("Phone Number", data.Telephone);
    completeFiledWithPlaceHolder("Email", data.Email);
    completeFiledWithPlaceHolder("Password", data.Password);
    completeFiledWithPlaceHolder("Confirm Password", data.Password);
  }



  const clickButtonWith = (text) => {
    cy.contains(text, { matchCase: false }).last().click();
  }
  const logOut = async () => {
    cy.wait(WAIT_TIME)

    cy.get('.v-toolbar__content > [role="button"]').click();



    cy.get('.v-list-item').contains("Log Out").click();
  }

  it('UC-20, 39, 71 Check Main Page Link and general info', () => {
    cy.visit('/');
    cy.get('.app-title').contains("Brothers' Barbershop");
    cy.get('.map').should('exist');
    cy.get('.barbershop-description').should('exist');
    cy.get('.description-paragraph').invoke('text')
      .then(text => expect(text.length).to.be.at.least(10));
    cy.contains('Current Status').should('exist');
  })



  it('Test Customer account creation', () => {
    cy.visit('/');
    clickSignIn();
    cy.contains('Sign UP', { matchCase: false }).click();

    completeSignupData(TestUserInfo);
    cy.get('.mt-5').contains('sign up', { matchCase: false }).click();
    cy.wait(WAIT_TIME);
    cy.wait(WAIT_TIME);
    cy.visit('/');
    cy.wait(WAIT_TIME);

    logOut();

  })

  it('UC-31 test customer login', () => {
    loginAccount(TestUserInfo);
    logOut();
  })

  it('UC-130 test upload image and delete', () => {
    loginAccount(TestUserInfo);
    cy.get('.icon > .edit-icon').click({ force: true });

    //check avatar not there before uploading
    cy.get('.v-avatar>img').should("not.exist");

    //test upload image
    cy.get('.mt-3').click();
    cy.get('input[accept*="image/png"]').selectFile('./cypress/fixtures/testIcon.png', { force: true });

    //check avatar should be there
    cy.get('.v-avatar>img').should("not.exist");

    //delete image
    clickButtonWith("delete current photo");
    clickButtonWith("yes, delete it");

    cy.get('.v-avatar>img').should("not.exist");

    cy.visit('/');
    logOut();
  })

  it('UC-35 test change password', () => {
    cy.visit('/');
    loginAccount(TestUserInfo);
    cy.wait(WAIT_TIME);
    clickIcon();
    cy.get('.v-list-item').contains("User Profile").click();
    cy.get('[href="/panel/profile/change-password"]').click();

    cy.get(':nth-child(1) > .v-input > .v-input__control > .v-input__slot')
      .type(TestUserInfo.Password);

    cy.get(':nth-child(2) > .v-input > .v-input__control > .v-input__slot')
      .type(MODIFIED_PASS);

    TestUserInfo.Password = MODIFIED_PASS;
    clickButtonWith('save');

    cy.wait(WAIT_TIME);

    cy.visit('/');
    logOut();

    loginAccount(TestUserInfo);
    logOut();



  })



  it('UC37, Login to admin account and log out', () => {

    loginAccount(TestAdminInfo);
    logOut();



  })

  it('UC-72 Check admin toggle busy status', () => {
    cy.visit('/');
    cy.contains('empty', { matchCase: false }).should('exist');
    cy.contains('busy', { matchCase: false }).should('not.exist');
    loginAccount(TestAdminInfo);

    // change default empty to busy
    cy.get('.v-toolbar__content > .mt-n4 > .row > :nth-child(2) > .rounded-xl').click();
    cy.get('.app-title').click();
    cy.contains('busy', { matchCase: false }).should('exist');
    cy.contains('empty', { matchCase: false }).should('not.exist');

    cy.get('[href="/panel/admin"]').last().click();

    //clean up
    cy.get('.v-toolbar__content > .mt-n4 > .row > :nth-child(1) > .rounded-xl').click();
    logOut();


  })

  //add more admin related testing in case of needing it


  it('UC 27, 36 Create Barber account, UC 120 barber-management', () => {

    loginAccount(TestAdminInfo);
    cy.get(':nth-child(2) > .d-flex > .row > .col-sm-12').click();
    cy.get('button>span').contains("Add Account").click();
    completeSignupData(TestBarberInfo);
    cy.get('.mt-5').contains('sign up', { matchCase: false }).click();

    cy.get('body').click(0, 0);



    cy.visit('/');
    logOut();

  })


  it('UC-29,30 save and edit barber info, UC-73 barber-login/out', () => {
    loginAccount(TestBarberInfo);
    cy.get('[href="/panel/profile/edit_profile"]').click();

    completeUserInfo(1, ModifiedBarberInfo.FirstName)
    completeUserInfo(2, ModifiedBarberInfo.LastName)
    completeUserInfo(3, ModifiedBarberInfo.Email)
    clickButtonWith('save')

    //click ok
    cy.get('.swal2-confirm').last().click()
    //check modified result
    cy.get('.menu-wrap > :nth-child(1) > :nth-child(2)')
      .contains(`${ModifiedBarberInfo.FirstName} ${ModifiedBarberInfo.LastName}`)

    logOut();
  })


  // add more barber tests here in case of needing it


  it('UC-28 delete barber-account', () => {
    loginAccount(TestAdminInfo);
    cy.get(':nth-child(2) > .d-flex > .row > .col-sm-12').click();
    //click 3 dot for delete menu
    cy.get('.v-responsive__content > .v-sheet > .v-toolbar__content > .v-btn > .v-btn__content > .v-icon').click()

    clickButtonWith('Delete User');

    cy.visit('/');
    logOut();

  })




  //temp removed it for now since backend part for this is not there yet

  // it('Test delete customer account', () => {
  //   loginAccount(TestUserInfo);
  //   cy.wait(WAIT_TIME);
  //   clickIcon();
  //   cy.get('.v-list-item').contains("User Profile").click();
  //   cy.get('[href="/panel/profile/unsubscribe"]').click();
  //   clickButtonWith('delete account');
  //   clickButtonWith('yes, delete it');
  // })




})