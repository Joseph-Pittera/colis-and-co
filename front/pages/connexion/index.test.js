import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, waitFor, screen } from "@testing-library/react";
import Connexion from "./";

const connexionMockedData = {
  // On va pouvoir passer les datas mockées dans ce qui est retourné en json
  email: "test@test.com",
  password: "aze",
};

const server = setupServer(
  // On précise ici l'url qu'il faudra "intercepter"
  rest.get("http://localhost:8000/login", (req, res, ctx) => {
    // Là on va pouvoir passer les datas mockées dans ce qui est retourné en json
    return res(ctx.json({ connexionData: connexionMockedData }));
  })
);

// Active la simulation d'API avant les tests depuis server
beforeAll(() => server.listen());
// Réinitialise tout ce qu'on aurait pu ajouter en termes de durée pour nos tests avant chaque test
afterEach(() => server.resetHandlers());
// Ferme la simulation d'API une fois que les tests sont finis
afterAll(() => server.close());
