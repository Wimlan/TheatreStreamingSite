describe("Backend loading indicators", () => {
  const show = {
    id: 6,
    title: "Test performance",
    subHeading: "Test description",
    image: "/act1.jpg",
  };
  const listUrl = /\/shows(?:\?.*)?$/;
  const bannerUrl = /\/shows\/6(?:\?.*)?$/;

  it("Shows accessible spinners until the banner and show lists finish loading", () => {
    cy.intercept("GET", listUrl, { delay: 1500, body: [show] }).as("shows");
    cy.intercept("GET", bannerUrl, { delay: 1500, body: show }).as("banner");
    cy.visit("http://localhost:5173/");
    cy.get(".loading_indicator[role='status']").should("have.length", 5);
    cy.get(".loading_indicator").first().should("contain.text", "Loading");
    cy.get(".loading_spinner").first().should("have.attr", "aria-hidden", "true");
    cy.wait(["@shows", "@shows", "@shows", "@shows", "@banner"]);
    cy.get(".loading_indicator").should("not.exist");
    cy.get("#main_banner").should("contain.text", show.title);
    cy.get(".show_genresection").should("have.length", 4);
  });

  it("Stops loading when the backend returns no shows", () => {
    cy.intercept("GET", listUrl, { body: [] });
    cy.intercept("GET", bannerUrl, { body: show });
    cy.visit("http://localhost:5173/");
    cy.contains("No shows found.").should("be.visible");
    cy.get(".loading_indicator").should("not.exist");
  });

  it("Shows errors instead of leaving the homepage spinners running", () => {
    cy.intercept("GET", listUrl, { statusCode: 500 });
    cy.intercept("GET", bannerUrl, { statusCode: 500 });
    cy.visit("http://localhost:5173/");
    cy.get("[role='alert']").should("have.length", 5);
    cy.get(".loading_indicator").should("not.exist");
  });

  it("Shows a spinner while details load, then shows an error if loading fails", () => {
    cy.intercept("GET", bannerUrl, {
      delay: 1500,
      statusCode: 500,
    }).as("details");
    cy.visit("http://localhost:5173/#/show/6");
    cy.get(".loading_indicator[role='status']").should("contain.text", "Loading details...");
    cy.get("#show_page > .button_container").should("not.exist");
    cy.get("#video_details").should("not.exist");
    cy.wait("@details");
    cy.get("[role='alert']").should("contain.text", "Could not load the show.");
    cy.get(".loading_indicator").should("not.exist");
    cy.get("#show_page > .button_container").should("not.exist");
    cy.get("#video_details").should("not.exist");
  });

  it("Only shows the detail action buttons after the show finishes loading", () => {
    cy.intercept("GET", bannerUrl, {
      delay: 1500,
      body: {
        ...show,
        venue: "Test theatre",
        description: "Test performance description",
      },
    }).as("details");
    cy.visit("http://localhost:5173/#/show/6");
    cy.get(".loading_indicator[role='status']").should("be.visible");
    cy.get("#show_page > .button_container").should("not.exist");
    cy.get("#video_details").should("not.exist");
    cy.wait("@details");
    cy.get(".loading_indicator").should("not.exist");
    cy.get("#detailed_info .banner").should("have.attr", "src", show.image);
    cy.get("#detailed_info").should("contain.text", "Test theatre");
    cy.get("#play_show").should("be.visible");
    cy.get("#show_page .trailer_button").should("be.visible");
    cy.get("#video_details").should("be.visible");
    cy.get("@details.all").should("have.length", 1);
    cy.get("#play_show").click();
    cy.get("#video_section").should("be.visible");
  });
});
