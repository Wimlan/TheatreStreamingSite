import {
  When,
  Then,
  Given,
  Before,
} from "@badeball/cypress-cucumber-preprocessor";

Before(() => {
  cy.visit("http://localhost:5173/");
});

Given("Jag går in på en föreställnings detaljsida", () => {
  cy.get("#to_show").click();
});

When("Jag klickar på knappen SPELA UPP", () => {
  cy.get("#play_show").click();
});

Then("Ett fönster med en video visas", () => {
  cy.get("#video_section").should("be.visible");
});
