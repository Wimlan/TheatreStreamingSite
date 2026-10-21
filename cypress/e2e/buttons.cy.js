describe("Action button alignment", () => {
  beforeEach(() => {
    const show = {
      id: 6,
      title: "Test show",
      image: "/act1.jpg",
      productionMembers: [],
    };
    cy.intercept("GET", /\/shows(?:\?.*)?$/, { body: [show] });
    cy.intercept("GET", /\/shows\/6(?:\?.*)?$/, { body: show });
  });

  function checkAlignment(selector) {
    cy.document().then((doc) => doc.fonts.ready);
    cy.get(selector).each(($button) => {
      cy.wrap($button).should("be.visible").and(($element) => {
        const button = $element[0];
        const bounds = button.getBoundingClientRect();
        const icon = button.querySelector("img").getBoundingClientRect();
        const label = button.querySelector("span").getBoundingClientRect();
        const centerY = bounds.top + bounds.height / 2;
        expect(Math.abs(icon.top + icon.height / 2 - centerY)).to.be.lessThan(1);
        expect(Math.abs(label.top + label.height / 2 - centerY)).to.be.lessThan(1);
        const contentCenterX = (icon.left + label.right) / 2;
        expect(Math.abs(contentCenterX - (bounds.left + bounds.width / 2))).to.be.lessThan(1);
        expect(icon.right).to.be.lessThan(label.left);
        expect(getComputedStyle(button).fontFamily).to.include("Open Sans");
      });
    });
  }

  it("Centers the banner icons and labels as a group on desktop", () => {
    cy.visit("http://localhost:5173/");
    [1024, 1440].forEach((width) => {
      cy.viewport(width, 900);
      checkAlignment("#main_banner .play_button, #main_banner .favorite_button");
    });
    cy.get("#main_banner .favorite_button").click().should("have.attr", "aria-pressed", "true");
  });

  it("Centers the detail action icons and labels on mobile and desktop", () => {
    cy.visit("http://localhost:5173/#/show/6");
    [375, 1024].forEach((width) => {
      cy.viewport(width, 900);
      checkAlignment("#show_page .play_button, #show_page .trailer_button");
    });
  });
});
