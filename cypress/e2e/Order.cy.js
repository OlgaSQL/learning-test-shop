import {registrationAndLogin} from '../support/reigistrationAndLogin';

describe('Placing an order', () => {

    it('order product', () => {
        cy.log('registration and login with valid credentials');
        registrationAndLogin();

        cy.log('Adds items to Basket');
        cy.get('[aria-label="Add to Basket"]').first().click();
        cy.contains('a', 'Me want it!').click();

        cy.log('Fills in shipping information');
        cy.contains('span', 'Account').click();
        cy.get('[aria-label="Show Orders and Payment Menu"]').last().click();
        cy.get('[aria-label="Go to saved address page"]').click({force: true});
        cy.contains('span', 'Add New Address').click({force: true});
        cy.get('[data-placeholder="Please provide a country."]').type('Ukraine');
        cy.get('[data-placeholder="Please provide a name."]').type('Olga');
        cy.get('[data-placeholder="Please provide a mobile number."]').type('444555888');
        cy.get('[data-placeholder="Please provide a ZIP code."]').type('20111');
        cy.get('[data-placeholder="Please provide an address."]').type('Shevcenko street');
        cy.get('[data-placeholder="Please provide a city."]').type('Kyiv');
        cy.contains('span', 'Submit').click();

        cy.log('Confirmation the payment options');
        cy.contains('span', 'Account').click();
        cy.get('[aria-label="Show Orders and Payment Menu"]').last().click();
        cy.contains('span', 'My Payment Options').click();
        cy.contains('mat-panel-title', 'Add new card').click();
        cy.get('input[type="text"]').last().type('Olga');
        cy.get('input[type="number"]').type('8787989809090909');
        cy.get('select').first().select('1');
        cy.get('select').last().select('2080');
        cy.contains('i', 'send').click();

        cy.log('Checout and submits the delivery type');
        cy.contains('span', 'Your Basket').click();
        cy.get('#checkoutButton').click();
        cy.get('.mat-radio-button').first().click();
        cy.contains('span', 'navigate_next').click();
        cy.get('.mat-radio-inner-circle').eq(1).click();
        cy.contains('span', 'Continue').click();

        cy.log('Submits the order and logout');
        cy.get('.mat-radio-inner-circle').click();
        cy.contains('span', 'Continue').click();
        cy.contains('span', 'Place your order and pay').click();
        cy.wait(1000);
        cy.get('.confirmation').should('be.visible');
        cy.contains('span', 'Account').click();
        cy.get('#navbarLogoutButton').click();
        cy.url().should('eq', 'https://juice-shop-sanitarskyi.herokuapp.com/#/');

    });
});