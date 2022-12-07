describe('Long Spider Leg Submersion browser tests', () => {
  it('visits the page', () => {
    cy.visit('https://quargsgreene.github.io/long-spider-leg-submersion/');
  });

  it('should display feedback when the user has no underwear', () => {
    cy.get('#prompt-3').type('0')
      .then(() => {
        cy.get('#underwear').click();
      }).then(() => {
        cy.get('#user-message').should('have.text', 'There is only one way to wear your underwear. Have fun!');
      });
  });

  it('should display feedback then the user enters an invalid input', () => {
    cy.get('#prompt-3').type('underwear')
      .then(() => {
        cy.get('#underwear').click();
      }).then(() => {
        cy.get('#user-message').should('have.text', 'Please give the non-Euclidean ventricle machine a non-negative integer quantity of underwear. Don\'t worry! I won\'t hit you with a spatula.');
      });
  });

  it('should display the correct number of underwear arangements', () => {
    cy.get('#prompt-3').type('3')
      .then(() => {
        cy.get('#underwear').click();
      }).then(() => {
        cy.get('#user-message').should('have.text', 'You can line up your underwear on top of a refrigerator in 6 ways! Have at it ;)');
      });
  });
});
