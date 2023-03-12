import { faker } from '@faker-js/faker';

describe('Registration', () => {
    it('should register a new user with valid data', () => {

        cy.log('should generate a random email and name');
        const email = faker.internet.email();
        const securityAnswerControl = faker.name.firstName()

        cy.log('Visit the registration page')
        cy.visit('/');
        cy.wait(1000);
        cy.contains('span', 'Dismiss').click();
        cy.contains('span', 'Account').click();
        cy.get('#navbarLoginButton').click();
        cy.contains('a', 'Not yet a customer?').click();
        cy.contains('h1', 'User Registration').should('be.visible');

        cy.log('Check if all the requirements for password are visible');
        cy.get('[type="checkbox"]').check({ force: true });
        cy.wait(1500);
        cy.contains('span', 'contains at least one lower character').should('be.visible');
        cy.contains('span', 'contains at least one upper character').should('be.visible');
        cy.contains('span', 'contains at least one digit').should('be.visible');
        cy.contains('span', 'contains at least one special character').should('be.visible');
        cy.contains('span', 'contains at least 8 characters').should('be.visible');
        cy.get('[type="checkbox"]').check({ force: true });

        cy.log('Fill in the registration form with valid data');
        cy.get('#emailControl').type(email);
        cy.get('#passwordControl').type('Testpassword1!');
        cy.get('#repeatPasswordControl').type('Testpassword1!');
        cy.get('[appearance="outline"]').eq(3).click();
        cy.contains('span', 'Name of your favorite pet?').click();
        cy.get('#registerButton').should('be.disabled');
        cy.get('#securityAnswerControl').type(securityAnswerControl);
        cy.get('#registerButton').should('not.be.disabled');
        cy.get('[class="mat-button-wrapper"]').last().click();
        cy.contains('a', 'Not yet a customer?').should('be.visible');

        cy.log('Verify that the user is redirected by login');
        cy.contains('a', 'Not yet a customer?').should('be.visible');
        cy.get('[name="email"]').type(email);
        cy.get('#password').type('Testpassword1!');
        cy.get('#loginButton').click();
        cy.contains('span', 'Account').click();
        cy.get('#navbarLogoutButton').should('be.visible');
    })
})