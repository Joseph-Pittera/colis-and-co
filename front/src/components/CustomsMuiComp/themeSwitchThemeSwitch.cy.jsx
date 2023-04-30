import React from "react";
import { ThemeSwitch } from "./themeSwitch";
import { ToggleColorModeProvider } from "../../utils/context/theme";

describe("<ThemeSwitch />", () => {
  it("Should render without crash", () => {
    cy.mount(
      <ToggleColorModeProvider>
        <ThemeSwitch />
      </ToggleColorModeProvider>
    );
  });
  it("IconButton contains DarkModeIcon by default", () => {
    cy.mount(
      <ToggleColorModeProvider>
        <ThemeSwitch />
      </ToggleColorModeProvider>
    );
    cy.get("button")
      .should("exist")
      .within(() => {
        cy.get('[data-testid="DarkModeIcon"]').should("exist");
      });
  });
  it("Should change theme on click", () => {
    cy.mount(
      <ToggleColorModeProvider>
        <ThemeSwitch />
      </ToggleColorModeProvider>
    );
    cy.get("button").click();
    cy.get('[data-testid="DarkModeIcon"]').click();
    cy.get('[data-testid="LightModeIcon"]').should("exist");
    cy.get('[data-testid="LightModeIcon"]').click();
    cy.get('[data-testid="DarkModeIcon"]').should("exist");
  });
});
