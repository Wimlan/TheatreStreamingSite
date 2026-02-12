describe("Wilmas spec", () => {
  it("Navigates to page", () => {
    cy.visit("http://localhost:5173/");
    cy.get("#search").type("marsch");
    cy.get("#search_result").contains("Marschkonsert med Arméns musikkår");
  });
});
