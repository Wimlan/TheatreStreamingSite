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

  it("Uses English navigation, categories and search without translating backend values", () => {
    cy.visit("http://localhost:5173/");
    cy.wait(["@shows", "@shows", "@shows", "@shows", "@details"]);
    cy.get("@shows.all").then((requests) => {
      const genres = requests.map(({ request }) => new URL(request.url).searchParams.get("genre"));
      expect(genres).to.include.members(["musikal", "drama", "komedi"]);
    });
    cy.get("#site_intro").should("have.text", "YOUR NEXT THEATRE EXPERIENCE");
    cy.get(".show_list h2").then(($headings) => {
      expect([...$headings].map((heading) => heading.textContent))
        .to.deep.equal(["Musical", "Drama", "Comedy"]);
    });
    cy.get("#main_banner").should("contain.text", show.title);
    cy.get("#main_banner .play_button").should("contain.text", "PLAY");
    cy.get("#main_banner .favorite_button").should("contain.text", "FAVORITES");
    cy.get('img[alt="Open and close menu"]').click();
    cy.get(".hamburger").should("contain.text", "HOME");
    cy.get("footer").should("contain.text", "Licenses:")
      .and("contain.text", "Prototype designed by")
      .and("contain.text", "Website created by");
    cy.get("#search").should("have.attr", "placeholder", "search").type("svensk");
    cy.wait("@shows");
    cy.contains("Results for svensk:").should("be.visible");
    cy.get("#search_result").should("contain.text", show.title)
      .and("contain.text", show.subHeading);
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
