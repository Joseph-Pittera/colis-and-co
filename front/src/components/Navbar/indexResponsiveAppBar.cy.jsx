import React from "react";
import { ResponsiveAppBar } from "./index";
import { ToggleColorModeProvider } from "../../utils/context/theme";
import { AuthProvider } from "../../utils/context/auth";
import Router from "next/router";

describe("<ResponsiveAppBar />", () => {
  context("stubbing out the router", () => {
    let router;
    beforeEach(() => {
      router = {
        back: cy.stub().as("routerBack"),
      };
      cy.stub(Router, "useRouter").returns(router);
    });

    it("renders", () => {
      cy.mount(
        <ToggleColorModeProvider>
          <AuthProvider>
            <ResponsiveAppBar />
          </AuthProvider>
        </ToggleColorModeProvider>
      );
    });
    beforeEach(() => {
      cy.mount(
        <ToggleColorModeProvider>
          <AuthProvider>
            <ResponsiveAppBar />
          </AuthProvider>
        </ToggleColorModeProvider>
      );
    });
    it("should display the logo", () => {
      cy.get("header").find("img").should("exist");
    });
    it("should display the darkmode icon", () => {
      cy.get('[data-testid="DarkModeIcon"]').should("exist");
    });
    it("should display the connexion menu", () => {
      cy.get('[data-testid="MenuIcon"]').should("exist");
    });
  });
});
