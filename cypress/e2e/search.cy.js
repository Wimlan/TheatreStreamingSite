describe("Responsive search", () => {
  beforeEach(() => {
    const show = { id: 6, title: "Test show", image: "/act1.jpg" };
    cy.intercept("GET", /\/shows(?:\?.*)?$/, { body: [show] }).as("shows");
    cy.intercept("GET", /\/shows\/6(?:\?.*)?$/, { body: show });
  });

  it("Opens and focuses mobile search, preserves queries, and closes with Escape", () => {
    cy.viewport(375, 812);
    cy.visit("http://localhost:5173/");
    cy.get("#search").should("not.be.visible");
    cy.get(".search_toggle").should("be.visible").and("have.attr", "aria-expanded", "false").click();
    cy.get("#search").should("be.visible").and("be.focused").type("Test");
    cy.contains("Results for Test:").should("be.visible");
    cy.get(".search_toggle").should("have.attr", "aria-expanded", "true").click();
    cy.get("#search").should("not.be.visible");
    cy.get(".search_toggle").click();
    cy.get("#search").should("have.value", "Test").and("be.focused").type("{esc}");
    cy.get("#search").should("not.be.visible");
    cy.get(".search_toggle").should("be.focused").and("have.attr", "aria-expanded", "false");
  });

  it("Fits narrow screens and keeps the menu and search from overlapping", () => {
    cy.viewport(320, 700);
    cy.visit("http://localhost:5173/");
    cy.get('img[alt="Open and close menu"]').click();
    cy.get(".hamburger").should("be.visible");
    cy.get(".search_toggle").click();
    cy.get(".hamburger").should("not.exist");
    cy.get("#search").should("be.visible").and(($input) => {
      const bounds = $input[0].getBoundingClientRect();
      expect(bounds.left).to.be.at.least(0);
      expect(bounds.right).to.be.at.most(320);
    });
    cy.get('img[alt="Open and close menu"]').click();
    cy.get("#search").should("not.be.visible");
    cy.get(".hamburger").should("be.visible");
  });

  it("Keeps desktop search visible across breakpoint changes with the smaller placeholder", () => {
    cy.viewport(1024, 900);
    cy.visit("http://localhost:5173/");
    cy.get(".search_toggle").should("not.be.visible");
    cy.get("#search").should("be.visible").and(($input) => {
      expect(getComputedStyle($input[0]).fontSize).to.equal("16px");
      expect(getComputedStyle($input[0], "::placeholder").fontSize).to.equal("14px");
    });
    cy.viewport(790, 900);
    cy.get("#search").should("not.be.visible");
    cy.get(".search_toggle").should("be.visible");
    cy.viewport(791, 900);
    cy.get("#search").should("be.visible");
    cy.get(".search_toggle").should("not.be.visible");
  });

  [375, 1024].forEach((width) => {
    it(`Searches from a detail page without losing focus at ${width}px`, () => {
      cy.viewport(width, 900);
      cy.visit("http://localhost:5173/#/show/6");
      cy.get("#play_show").should("be.visible");
      if (width <= 790) {
        cy.get(".search_toggle").click();
      }
      cy.get("#search").type("   ");
      cy.location("hash").should("equal", "#/show/6");
      cy.get("#search").type("T");
      cy.location("hash").should("equal", "#/");
      cy.wait("@shows").its("request.query.title").should("equal", "T");
      cy.get("#search_result").should("contain.text", "Test show");
      cy.get("#search").should("be.focused").and("have.value", "   T").type("est");
      cy.get("@shows.all").should((requests) => {
        expect(requests.some(({ request }) => request.query.title === "Test")).to.equal(true);
      });
      cy.get("#search").should("have.value", "   Test").and("be.focused");
      cy.get("#search_result a").first().click();
      cy.location("hash").should("equal", "#/show/6");
      cy.get("#search").should("have.value", "");
      if (width <= 790) {
        cy.get("#search").should("not.be.visible");
        cy.get(".search_toggle").should("have.attr", "aria-expanded", "false");
      }
    });

    it(`Clears the search after selecting a show at ${width}px`, () => {
      cy.viewport(width, 900);
      cy.visit("http://localhost:5173/");
      if (width <= 790) {
        cy.get(".search_toggle").click();
      }
      cy.get("#search").type("Test");
      cy.get("#search_result").should("contain.text", "Test show");
      cy.get("#search_result a").first().click();
      cy.location("hash").should("equal", "#/show/6");
      cy.get("#search").should("have.value", "");
      if (width <= 790) {
        cy.get("#search").should("not.be.visible");
        cy.get(".search_toggle").should("have.attr", "aria-expanded", "false").click();
        cy.get("#search").should("be.visible").and("have.value", "");
        cy.get(".search_toggle").click();
      }
      cy.get('img[alt="Back to the homepage"]').click();
      cy.get("#search_result").should("not.exist");
      cy.get("#show_article").should("be.visible");
      cy.get("#search").should("have.value", "");
    });
  });
});
