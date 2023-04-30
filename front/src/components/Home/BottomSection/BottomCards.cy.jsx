import React from "react";
import { BottomCards } from "./BottomCards";

describe("<BottomCards />", () => {
  it("Should render without crash", () => {
    cy.mount(<BottomCards youAre="expeditor" />);
  });

  it("displays cards with correct text for expeditor", () => {
    const cardsTxt = {
      expeditor: [
        [
          "Déposez une annonce",
          "Dites ce que vous voulez envoyer. Détaillez votre annonce avec l'adresse, les dimensions, le poids et le détail de livraison.",
        ],
        [
          "Recevez des propositions",
          "Les voyageurs vous contactent par texto ou mail. Mettez-vous d'accord sur les détails de livraison (prix, date d'enlèvement et de livraison).",
        ],
        [
          "Validez votre réservation",
          "Réglez en ligne pour bénéficier d'une assurance et suivre votre colis. Votre paiement ne sera versé au voyageur qu'une fois le colis livré.",
        ],
      ],
    };

    cy.mount(<BottomCards youAre="expeditor" />);
    cy.get("div")
      .eq(2)
      .within(() => {
        cy.get(".MuiCardContent-root").each((card, i) => {
          cy.wrap(card)
            .find("p")
            .each((typo, j) => {
              cy.wrap(typo).contains(cardsTxt.expeditor[i][j]);
            });
        });
      });
  });
  it("displays cards with correct text for deliverer", () => {
    const cardsTxt = {
      deliverer: [
        [
          "Enregistrez vos trajets",
          "Renseignez le ou les trajets sur lesquels vous souhaitez assurer le transport d’objets ou de colis. Bring4you vous adressera des propositions de collecte que vous pouvez accepter ou non.",
        ],
        [
          "Contactez les expéditeurs",
          "Vous pouvez aussi choisir vous-même les demandes de collecte qui vous intéressent, puis vous mettre d’accord avec l’expéditeur sur les détails de la livraison (participation à vos frais de voyage, date d’enlèvement, de collecte…).",
        ],
        [
          "Recevez le paiement",
          "Une fois la livraison réalisée par vous-même, vous recevrez de Bring4you le paiement de la participation à vos frais de transport directement sur votre compte.",
        ],
      ],
    };

    cy.mount(<BottomCards youAre="deliverer" />);
    cy.get("div")
      .eq(2)
      .within(() => {
        cy.get(".MuiCardContent-root").each((card, i) => {
          cy.wrap(card)
            .find("p")
            .each((typo, j) => {
              cy.wrap(typo).contains(cardsTxt.deliverer[i][j]);
            });
        });
      });
  });
});
