import {registrationAndLogin} from '../support/reigistrationAndLogin';
import {searchProductByName} from '../support/helperSearchProduct';
import {orderAndSubmit} from '../support/orderAndSubmit';

describe('Login and logout ', () => {
    it('order by helper function', () => {
        let productName = 'Green Smoothie'

        cy.log('registration and login with valid credentials');
        registrationAndLogin();

        cy.log('searching by helper');
        searchProductByName(productName);

        cy.log('buy product');
        orderAndSubmit();

    });
});


