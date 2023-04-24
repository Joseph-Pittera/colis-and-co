import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
  env: {
    baseUrl: "https://projet-colis-and-co-git-testing-colisandco.vercel.app",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      baseUrl: "https://projet-colis-and-co-git-testing-colisandco.vercel.app";
    },
  },
});
