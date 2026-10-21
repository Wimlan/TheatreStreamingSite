import {
  When,
  Then,
  Given,
  Before,
} from "@badeball/cypress-cucumber-preprocessor";

Before(() => {
  cy.visit("http://localhost:5173/");
});

Given("I open a show's details page", () => {
  cy.get("#to_show").click();
});

When("I click the PLAY button", () => {
  cy.get("#play_show").click();
});

Then("A window with a video is displayed", () => {
  cy.get("#video_section").should("be.visible");
});
