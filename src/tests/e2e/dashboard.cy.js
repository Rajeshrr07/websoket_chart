describe("Dashboard", () => {
    it("should display metrics and charts", () => {
      cy.visit("/");
      cy.get(".metrics-card").should("have.length.greaterThan", 0);
      cy.get("canvas").should("be.visible");
    });
  
    it("should filter metrics by timeframe", () => {
      cy.visit("/");
      cy.get(".btn").contains("Last Hour").click();
      cy.get(".metrics-card").should("be.visible");
    });
  });
  