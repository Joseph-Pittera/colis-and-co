describe("The Home Page", () => {
  it("successfully loads with header, main and footer", () => {
    cy.visit("https://projet-colis-and-co.vercel.app");
    cy.get("header").should("exist");
    cy.get("main").should("exist");
    cy.get("footer").should("exist");
  });
});
describe("The cookies modal", () => {
  beforeEach(() => {
    cy.visit("https://projet-colis-and-co.vercel.app");
  });
  it("successfully loads", () => {
    cy.get("#cookies-modal").should("be.visible");
  });
  it("successfully refuse", () => {
    cy.get("button").contains("Refuser").click();
    cy.get("#cookies-modal").should("not.exist");
  });
  it("successfully accept and keep response in localStorage", () => {
    cy.get("button").contains("Accepter").click();
    cy.get("#cookies-modal").should("not.exist");
    cy.window()
      .its("localStorage.colisandcoCookieConsent")
      .should("eq", "true");
  });
});
describe("The Home Page Links", () => {
  beforeEach(() => {
    cy.visit("https://projet-colis-and-co.vercel.app");
    cy.get("button").contains("Accepter").click();
  });
  it("successfully redirect to List of courses", () => {
    cy.get("button").contains("Liste des courses").click();
    cy.get("header").should("exist");
    cy.get("main").should("exist");
    cy.get("footer").should("exist");
  });
  it("successfully redirect to Proposer un envoi", () => {
    cy.get("button").contains("Je propose un envoi").click();
    cy.get("header").should("exist");
    cy.get("main").should("exist");
    cy.get("footer").should("exist");
  });
  it("successfully redirect to Connexion page", () => {
    cy.get("button").contains("Connexion").click();
    cy.get("header").should("exist");
    cy.get("main").should("exist");
    cy.get("footer").should("exist");
  });
  it("successfully redirect to Register page", () => {
    cy.get("button").contains("Inscription").click();
    cy.get("header").should("exist");
    cy.get("main").should("exist");
    cy.get("footer").should("exist");
  });
});
describe("The Course list Page", () => {
  it("successfully loads with header, main and footer", () => {
    cy.visit("https://projet-colis-and-co.vercel.app/expedition/courses");
    cy.get("header").should("exist");
    cy.get("main").should("exist");
    cy.get("footer").should("exist");
  });
  beforeEach(() => {
    cy.visit("https://projet-colis-and-co.vercel.app/expedition/courses");
  });
  // it("successfully loads with a list of courses", () => {
  //   cy.get("ul").should("exist");
  //   cy.get("li").should("exist");
  // });
});
