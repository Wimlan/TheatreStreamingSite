describe("Main banner sizing", () => {
  [
    { name: "wide", width: 800, height: 300 },
    { name: "portrait", width: 300, height: 800 },
  ].forEach(({ name, width: imageWidth, height: imageHeight }) => {
    it(`Fills tablet and phone widths without stretching a ${name} photo`, () => {
      const show = {
        id: 6,
        title: "Banner sizing test",
        image: `data:image/svg+xml,${encodeURIComponent(
          `<svg xmlns="http://www.w3.org/2000/svg" width="${imageWidth}" height="${imageHeight}"><rect width="100%" height="100%" fill="blue"/></svg>`,
        )}`,
      };

      cy.intercept("GET", "**/shows*", { body: [show] });
      cy.intercept("GET", "**/shows/6*", { body: show });
      cy.visit("http://localhost:5173/");

      [1440, 1061, 1060, 1024, 791, 790, 541, 540, 375, 320].forEach((width) => {
        cy.viewport(width, 900);
        cy.get("#main_image").should(($image) => {
          const image = $image[0];
          const bounds = image.getBoundingClientRect();
          expect(image.naturalWidth).to.equal(imageWidth);
          expect(getComputedStyle(image).objectFit).to.equal("cover");

          if (width <= 1060) {
            expect(bounds.left).to.be.closeTo(0, 1);
            expect(bounds.width).to.be.closeTo(image.ownerDocument.documentElement.clientWidth, 1);
          } else {
            expect(bounds.width).to.be.lessThan(width);
          }

          const expectedHeight = width <= 540
            ? 350
            : width <= 790
              ? 450
              : bounds.width * 9 / 16;
          expect(bounds.height).to.be.closeTo(expectedHeight, 1);
        });
        cy.get("#main_banner .title_box").should(($title) => {
          const bounds = $title[0].getBoundingClientRect();
          expect(bounds.left).to.be.at.least(0);
          expect(bounds.right).to.be.at.most(width);
        });
      });
    });
  });
});
