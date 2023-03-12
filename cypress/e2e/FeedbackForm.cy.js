
describe('FeedbackForm Test', () => {
  
  it('Submits Feedback form successfully', () => {
    cy.log('Visit the feedback form page')
    cy.visit('http://juice-shop-sanitarskyi.herokuapp.com/#/contact')
    cy.contains('span', 'Dismiss').click();

    cy.log('Enter a feedback message');
    cy.get('#comment').type('Cool shop')

    cy.log('choose rating by slider');
    cy.get('[id="rating"]').type('{rightArrow}{rightArrow}{leftArrow}{leftArrow}');

    cy.log('Confirm by captcha');
    const captchaEl = cy.get('#captcha');
    captchaEl.invoke('text').then(captchaText => {
      const expression = captchaText.match(/(\d+)\s*([\+\-\*\/])\s*(\d+)/);
      const result = eval(`${captchaText}`);
      cy.get('#captchaControl').type(result);
    });

    cy.log('submit your feedback');
    cy.get('#submitButton').click();

    cy.log('Confirm that a success message is displayed');
    cy.contains('span', 'Thank you for your feedback.').should('be.visible');
  })
})