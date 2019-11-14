import { getGreeting } from '../support/app.po';

describe('magic-bean', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to magic-bean!');
  });
});
