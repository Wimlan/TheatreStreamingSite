import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";
import { defineConfig } from "cypress";

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });
      on("file:preprocessor", bundler);

      await addCucumberPreprocessorPlugin(on, config);

      return config;
    },
    specPattern: [
      // E2E-filer Cypress letar efter som standard
      "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
      // Tillägg för Cucumber
      "cypress/e2e/**/*.feature",
    ],
  },
});
