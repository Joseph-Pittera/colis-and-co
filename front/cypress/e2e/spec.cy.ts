describe("The Home Page", () => {
  it("successfully loads with header, main and footer", () => {
    cy.visit("https://projet-colis-and-co-git-testing-colisandco.vercel.app/");
    cy.get("header").should("exist");
    cy.get("main").should("exist");
    cy.get("footer").should("exist");
  });
});
describe("The cookies modal", () => {
  beforeEach(() => {
    cy.visit("https://projet-colis-and-co-git-testing-colisandco.vercel.app/");
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
    cy.visit("https://projet-colis-and-co-git-testing-colisandco.vercel.app/");
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
    cy.visit(
      "https://projet-colis-and-co-git-testing-colisandco.vercel.app/expedition/courses"
    );
    cy.get("header").should("exist");
    cy.get("main").should("exist");
    cy.get("footer").should("exist");
  });
  beforeEach(() => {
    cy.visit(
      "https://projet-colis-and-co-git-testing-colisandco.vercel.app/expedition/courses"
    );
  });
  it("successfully loads with a list of courses", () => {
    cy.get("ul").should("exist");
    cy.get("li").should("exist");
  });
  it("successfully redirect to the details of a course", () => {
    cy.get("li").first().click();
    cy.get("h1").contains("Détails de la course").should("exist");
  });
});
describe("The Connexion Page", () => {
  it("successfully loads with header, main and footer", () => {
    cy.visit(
      "https://projet-colis-and-co-git-testing-colisandco.vercel.app/login"
    );
    cy.get("header").should("exist");
    cy.get("main").should("exist");
    cy.get("footer").should("exist");
    cy.get("h1").contains("Connexion").should("exist");
  });
  beforeEach(() => {
    cy.visit(
      "https://projet-colis-and-co-git-testing-colisandco.vercel.app/login"
    );
  });
  it("successfully loads connexion and password inputs", () => {
    cy.get('input[name="email"]').should("exist");
    cy.get('input[name="password"]').should("exist");
  });
  it.skip("successfully connect allowed user and redirect to home page", () => {
    cy.get('input[name="email"]').type("test@test.com");
    cy.get('input[name="password"]').type("Azerty1!");
    cy.get("button[type=submit]").contains("Connexion").click();
    cy.location().should((loc) => {
      expect(loc.host).to.eq(
        "projet-colis-and-co-git-testing-colisandco.vercel.app"
      );
      expect(loc.protocol).to.eq("https:");
    });
    cy.get("#avatar-button").should("exist");
  });
  it("successfully show alert for not allowed users", () => {
    cy.get('input[name="email"]').type("test@test.com");
    cy.get('input[name="password"]').type("azer");
    cy.get("button[type=submit]").contains("Connexion").click();
    cy.get('div[role="alert"]').should("exist");
  });
});
describe.only("The Register Page", () => {
  it("successfully loads with header, main and footer", () => {
    cy.visit(
      "https://projet-colis-and-co-git-testing-colisandco.vercel.app/register"
    );
    cy.get("header").should("exist");
    cy.get("main").should("exist");
    cy.get("footer").should("exist");
    cy.get("h1").contains("Inscription").should("exist");
  });
  beforeEach(() => {
    cy.visit(
      "https://projet-colis-and-co-git-testing-colisandco.vercel.app/register"
    );
  });
  it("successfully loads connexion and password inputs", () => {
    cy.get('input[name="email"]').should("exist");
    cy.get('input[name="password"]').should("exist");
    cy.get('input[name="passwordConfirm"]').should("exist");
    cy.get('input[name="first_name"]').should("exist");
    cy.get('input[name="last_name"]').should("exist");
    cy.get('input[name="address"]').should("exist");
    cy.get('input[name="birth_date"]').should("exist");
    cy.get('input[name="phone_number"]').should("exist");
  });
  it("successfully show alert if email alreay used", () => {
    cy.get('input[name="email"]').type("test@test.com");
    cy.get('input[name="password"]').type("Azerty1!");
    cy.get('input[name="passwordConfirm"]').type("Azerty1!");
    cy.get('input[name="first_name"]').type("test");
    cy.get('input[name="last_name"]').type("test");
    cy.get('input[name="birth_date"]').type("2001-01-01");
    cy.get('input[name="phone_number"]').type("0102030405");
    cy.get('input[name="address"]').type("10 rue de la paix 75002 Paris");
    cy.get("button[type=submit]").contains("Inscription").click();

    cy.get('div[role="alert"]').should("exist");
  });
});
