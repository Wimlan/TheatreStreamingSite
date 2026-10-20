describe("Wilmas spec", () => {
  it("Keeps wide and portrait show photos proportional at different viewport sizes", () => {
    const shows = [
      { id: 1, title: "Wide photo", width: 800, height: 300 },
      { id: 2, title: "Portrait photo", width: 300, height: 800 },
    ].map(({ width, height, ...show }) => ({
      ...show,
      subHeading: "Photo sizing test",
      image: `data:image/svg+xml,${encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="100%" height="100%" fill="blue"/></svg>`,
      )}`,
    }));

    cy.intercept("GET", "**/shows*", { body: shows });
    cy.visit("http://localhost:5173/");

    [1440, 1024, 375].forEach((width) => {
      cy.viewport(width, 900);
      cy.get(".show_image img").should(($images) => {
        expect($images.length).to.be.at.least(2);
        $images.each((_, img) => {
          expect(img.naturalWidth).to.be.greaterThan(0);
          expect(getComputedStyle(img).objectFit).to.equal("cover");
          expect(img.getBoundingClientRect().width).to.equal(250);
          expect(img.getBoundingClientRect().height).to.equal(150);
          const card = img.closest("ul");
          expect(card.getBoundingClientRect().height).to.be.at.least(320);
          expect(getComputedStyle(card).minHeight).to.equal("320px");
          expect(card.querySelector(".description").getBoundingClientRect().bottom)
            .to.be.at.most(card.getBoundingClientRect().bottom);
        });
      });
    });
  });

  it("Keeps every show card reachable in mobile scrolling rows", () => {
    const shows = Array.from({ length: 4 }, (_, index) => ({
      id: index + 1,
      title: `Show ${index + 1}`,
      subHeading: "Scrolling test",
      image: "/act1.jpg",
    }));
    cy.intercept("GET", "**/shows*", { body: shows });
    cy.visit("http://localhost:5173/");

    [320, 375, 540, 790, 1024, 1250].forEach((width) => {
      cy.viewport(width, 900);
      cy.get("#show_article .show_genresection").should("have.length", 4);
      cy.get("#show_article .show_genresection").each(($row) => {
        cy.wrap($row).scrollTo("left").should(($element) => {
          const row = $element[0];
          const bounds = row.getBoundingClientRect();
          const first = row.querySelector("ul").getBoundingClientRect();
          expect(bounds.left).to.be.at.least(0);
          expect(bounds.right).to.be.at.most(width);
          expect(row.scrollWidth).to.be.greaterThan(row.clientWidth);
          expect(first.left).to.be.at.least(bounds.left);
          expect(first.right).to.be.at.most(bounds.right);
          row.querySelectorAll("ul").forEach((card) => {
            const cardBounds = card.getBoundingClientRect();
            expect(cardBounds.height).to.be.at.least(320);
            expect(getComputedStyle(card).minHeight).to.equal("320px");
            const description = card.querySelector(".description").getBoundingClientRect();
            expect(description.bottom).to.be.at.most(cardBounds.bottom);
            const icon = [...card.querySelectorAll(".play_icon, .play_icon_blue")]
              .find((element) => getComputedStyle(element).display !== "none");
            expect(icon, "visible play icon").to.exist;
            const iconBounds = icon.querySelector("img").getBoundingClientRect();
            expect(iconBounds.width).to.equal(36);
            expect(iconBounds.height).to.equal(36);
            expect(cardBounds.right - iconBounds.right).to.equal(24);
            expect(cardBounds.bottom - iconBounds.bottom).to.equal(24);
            expect(description.bottom).to.be.at.most(iconBounds.top);
          });
        });
        cy.wrap($row).scrollTo("right").should(($element) => {
          const row = $element[0];
          const bounds = row.getBoundingClientRect();
          const last = row.querySelector("ul:last-child").getBoundingClientRect();
          expect(row.scrollLeft).to.be.greaterThan(0);
          expect(last.left).to.be.at.least(bounds.left);
          expect(last.right).to.be.at.most(bounds.right);
        });
      });
    });
  });

  it("Navigates to page", () => {
    cy.visit("http://localhost:5173/");
    cy.get("#search").type("marsch");
    cy.get("#search_result").contains("Marschkonsert med Arméns musikkår");
  });
});
