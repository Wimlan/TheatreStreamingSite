describe("English interface", () => {
  const show = {
    id: 6,
    title: "En svensk titel",
    subHeading: "En svensk underrubrik",
    description: "En svensk beskrivning",
    venue: "Svenska teatern",
    image: "/act1.jpg",
    productionMembers: [],
  };

  beforeEach(() => {
    cy.intercept("GET", /\/shows(?:\?.*)?$/, { body: [show] }).as("shows");
    cy.intercept("GET", /\/shows\/6(?:\?.*)?$/, { body: show }).as("details");
  });

  it("Uses English details and video labels while preserving backend copy", () => {
    cy.visit("http://localhost:5173/#/show/6");
    cy.wait("@details");
    cy.get("#detailed_info").should("contain.text", show.title)
      .and("contain.text", show.description)
      .and("contain.text", show.venue)
      .and("contain.text", "Reviews")
      .and("contain.text", "A performance worth seeing!");
    cy.get('img[alt="Back to the homepage"]').should("be.visible");
    cy.get('img[alt="Add to your favorites"]').should("be.visible");
    cy.get("#video_details").should("contain.text", "Parts")
      .and("contain.text", "Act 1 - Before it all happened")
      .and("contain.text", "Act 2 - After it all happened")
      .and("contain.text", "Extras")
      .and("contain.text", "Interview with the director");
    cy.get("#play_show").should("contain.text", "PLAY").click();
    cy.get("#video_section").should("be.visible");
    cy.get('img[alt="Close video window"]').click();
    cy.get("#video_section").should("not.exist");
  });
});
