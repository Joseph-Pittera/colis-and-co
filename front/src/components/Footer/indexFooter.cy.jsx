import React from "react";
import { Footer } from "./index";
import { ToggleColorModeProvider } from "../../utils/context/theme";

describe("<Footer />", () => {
  it("Should render without crash", () => {
    cy.mount(
      <ToggleColorModeProvider>
        <Footer />
      </ToggleColorModeProvider>
    );
  });
  it("Should display social media links", () => {
    cy.mount(
      <ToggleColorModeProvider>
        <Footer />
      </ToggleColorModeProvider>
    );
    cy.get("footer")
      .find("div")
      .first()
      .should("exist")
      .within(() => {
        cy.get("a").each((link) => {
          cy.wrap(link).should("have.attr", "href").and("include", "/");
        });
      });
    cy.get("footer")
      .find("div")
      .eq(1)
      .should("exist")
      .within(() => {
        cy.get("a").each((link) => {
          cy.wrap(link).should("have.attr", "href").and("include", "https://");
        });
      });
  });
});
