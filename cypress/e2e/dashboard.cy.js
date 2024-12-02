describe('Dashboard', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should display the dashboard components', () => {
    cy.get('[data-testid="dashboard"]').should('be.visible');
    cy.wait(2000);
    cy.get('[data-testid="websocket-alert"]').should('exist');
    cy.get('[data-testid="filter-component"]').should('be.visible');
    cy.get('[data-testid="charts-container"]').should('be.visible');
  });

  it('should display charts in the bids and asks sections', () => {
    cy.get('[data-testid="bids-section"]').should('be.visible');
    cy.get('[data-testid="asks-section"]').should('be.visible');
    cy.get('[data-testid="line-chart-bids"]').should('be.visible');
    cy.get('[data-testid="bar-chart-bids"]').should('be.visible');
    cy.get('[data-testid="pie-chart-bids"]').should('be.visible');
    cy.get('[data-testid="line-chart-asks"]').should('be.visible');
    cy.get('[data-testid="bar-chart-asks"]').should('be.visible');
    cy.get('[data-testid="pie-chart-asks"]').should('be.visible');
  });
});
