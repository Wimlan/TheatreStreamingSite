describe("Wilmas spec", () => {
  it("Navigates to page", () => {
    cy.visit("http://localhost:5174/");
    cy.get("li").contains("Svansjön");
  });
});
