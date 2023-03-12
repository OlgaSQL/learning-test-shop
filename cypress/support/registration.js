import { faker } from '@faker-js/faker';

export function registration(){
    cy.log('should generate a random email and name');
    const randomEmail = faker.internet.email();
    const securityAnswerControl = faker.name.firstName()

    cy.contains('a', 'Not yet a customer?').click();
    cy.contains('h1', 'User Registration').should('be.visible');

    cy.log('Fill in the registration form with valid data');
    cy.get('#emailControl').type(randomEmail);
    cy.get('#passwordControl').type('Testpassword1!');
    cy.get('#repeatPasswordControl').type('Testpassword1!');
    cy.get('[appearance="outline"]').eq(3).click();
    cy.contains('span', 'Name of your favorite pet?').click();
    cy.get('#registerButton').should('be.disabled');
    cy.get('#securityAnswerControl').type(securityAnswerControl);
    cy.get('#registerButton').should('not.be.disabled');
    cy.get('[class="mat-button-wrapper"]').last().click();
    cy.contains('a', 'Not yet a customer?').should('be.visible');
    return randomEmail;
}
