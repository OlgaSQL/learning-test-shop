
import {registration} from '../support/registration';
let randomEmail;

describe('Login and logout ', () => {
    beforeEach(() => {
        cy.log('Visit the Login page');
        cy.visit('/');
        cy.wait(1000);
        cy.contains('a', 'Me want it!').click();
        cy.contains('span', 'Dismiss').click();
        cy.contains('span', 'Account').click();
        cy.get('#navbarLoginButton').click();
        cy.contains('a', 'Not yet a customer?').should('be.visible');
        randomEmail = registration();
    });

    it('should log in with valid credentials and logout successfully', () => {
        cy.log('login');
        cy.get('[name="email"]').type(randomEmail);
        cy.get('#password').type('Testpassword1!');
        cy.get('#loginButton').click();
        
        cy.log('logout after login with valid credentials');
        cy.contains('span', 'Account').click();
        cy.get('#navbarLogoutButton').click();

        cy.log('verify that logout successfully');
        cy.url().should('eq', 'https://juice-shop-sanitarskyi.herokuapp.com/#/')
    });
    
    it('should display an error message with invalid email', () => {
        cy.get('[name="email"]').type('ouse@gmail.com');
        cy.get('#password').type('Testpassword1!');
        cy.get('#loginButton').click();
        cy.contains('div' , 'Invalid email or password.').should('be.visible');
    });

    it('should display an error message with invald password', () => {
        cy.get('[name="email"]').clear().type(randomEmail);
        cy.get('#password').clear().type('estpassword1!');
        cy.get('#loginButton').click();
        cy.contains('div', 'Invalid email or password.').should('be.visible');
    });
});