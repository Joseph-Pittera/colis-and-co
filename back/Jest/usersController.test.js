/* const UsersController = require('../app/controllers/api/usersController');
const usersDataMapper = require('../app/models/usersDataMapper');

// Définir une suite de tests pour le UsersController
describe('UsersController', () => {
  // Définir une suite de tests pour la méthode loginAction
  describe('loginAction', () => {
    // Définir un test pour vérifier que la méthode renvoie un objet utilisateur et un jeton si l'email et le mot de passe sont valides
    it('should return a user object and token if email and password are valid', async () => {
      // Arrange : définir les entrées et sorties attendues du test
      const email = 'test@example.com';
      const password = 'password123';
      const req = { body: { email, password } };
      const res = { json: jest.fn(), status: jest.fn() };
      const dataMapperMock = {
        loginAction: jest.fn().mockResolvedValueOnce({
          id: 1,
          email,
          firstName: 'John',
          lastName: 'Doe',
        }),
      };

      controller.usersDataMapper = dataMapperMock;

      // Act : exécuter la méthode à tester
      await controller.loginAction(req, res);

      // Assert : vérifier que la méthode a renvoyé les résultats attendus
      // Vérifier que la méthode `loginAction` a été appelée avec l'email et le mot de passe fournis
      expect(dataMapperMock.loginAction).toHaveBeenCalledWith(email, password);
      // Vérifier que la méthode a renvoyé l'utilisateur attendu sous forme de JSON, avec un jeton inclus
      expect(res.json).toHaveBeenCalledWith({
        user: {
          id: 1,
          email,
          firstName: 'John',
          lastName: 'Doe',
          token: expect.any(String),
        },
      });
      // Vérifier que la méthode a renvoyé un code d'état HTTP 200
      expect(res.status).toHaveBeenCalledWith(200);
    });

    // Définir un test pour vérifier que la méthode renvoie un code d'état 401 si l'email ou le mot de passe est invalide
    it('should return a 401 status if email or password is invalid', async () => {
      // Arrange : définir les entrées et sorties attendues du test
      const email = 'test@example.com';
      const password = 'invalidPassword';
      const req = { body: { email, password } };
      const res = { json: jest.fn(), status: jest.fn() };
      const dataMapperMock = {
        loginAction: jest.fn().mockResolvedValueOnce(null),
      };
      const controller = new UsersController();
      controller.constructor.dataMapper = dataMapperMock;

      // Act : exécuter la méthode à tester
      await controller.loginAction(req, res);

      // Assert : vérifier que la méthode a renvoyé les résultats attendus
      // Vérifier que la méthode `loginAction` a été appelée avec l'email et le mot de passe fournis
      expect(dataMapperMock.loginAction).toHaveBeenCalledWith(email, password);
      // Vérifier que la méthode n'a pas renvoyé de résultat sous forme de JSON
      expect(res.json).not.toHaveBeenCalled();
      // Vérifier que la méthode a renvoyé un code d'état HTTP 401
      expect(res.status).toHaveBeenCalledWith(401);
    });
  });
});
 */
