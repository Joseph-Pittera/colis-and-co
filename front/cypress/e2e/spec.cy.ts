describe("The Home Page", () => {
  it("successfully loads", () => {
    cy.visit("https://projet-colis-and-co.vercel.app");
  });
});
describe("The Cookies Modale", () => {
  it("successfully loads", () => {
    cy.visit("https://projet-colis-and-co.vercel.app");
    cy.get("#cookies-modal").should("be.visible");
  });
  it("successfully refuse", () => {
    cy.get("#refuse-cookies").click();
    cy.get("#cookies-modal").should("be.unvisible");
  });
});
