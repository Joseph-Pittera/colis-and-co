import React from "react";
import YouAreBtn from "./YouAreBtn";

describe("<YouAreBtn />", () => {
  it("Should render without crash", () => {
    cy.mount(<YouAreBtn />);
  });
  it("should be set to expedito by default", () => {
    cy.mount(<YouAreBtn />);
    cy.get("#expeditor-btn").should("have.class", "MuiButton-contained");
    cy.get("#expeditor-btn").should("have.text", "Expéditeur");
    cy.get("#deliverer-btn").should("have.class", "MuiButton-outlined");
    cy.get("#deliverer-btn").should("have.text", "Livreur");
  });
  it("should change the state of each button by cicking on one another", () => {
    cy.mount(<YouAreBtn />);
    cy.get("#deliverer-btn").click();
    cy.get("#deliverer-btn").should("have.class", "MuiButton-contained");
    cy.get("#deliverer-btn").should("have.text", "Livreur");
    cy.get("#expeditor-btn").should("have.class", "MuiButton-outlined");
    cy.get("#expeditor-btn").should("have.text", "Expéditeur");
    cy.get("#expeditor-btn").click();
    cy.get("#expeditor-btn").should("have.class", "MuiButton-contained");
    cy.get("#expeditor-btn").should("have.text", "Expéditeur");
    cy.get("#deliverer-btn").should("have.class", "MuiButton-outlined");
    cy.get("#deliverer-btn").should("have.text", "Livreur");
  });
});
