const jwt = require('jsonwebtoken');
const debug = require('debug')('colis:controllers');

const CoreController = require('./coreController');
const usersDataMapper = require('../../models/usersDataMapper');

/** Class representing a user controller */
class UsersController extends CoreController {
  static dataMapper = usersDataMapper;

  /**
   * create a user controller
  *
  * @augments CoreController
  */
  constructor() {
    super();
    debug('userController created');
  }

  async loginAction(req, res) {
    try {
      // eslint-disable-next-line max-len
      // afin d'utiliser de manière plus rapide et plus lisible les données du body, on déstructure l'objet body afin de transformer chaque propriété utile en variable simple
      const { email, password } = req.body;

      console.log(email, password);

      // On doit vérifier si l'email et le password de l'utilisateur  existe dans la base de données
      // eslint-disable-next-line max-len
      // on doit faire appel au userDatamapper afin de faire la requête et la stocker dans une variable
      // on va devoir créer la requête dans un userDatamapper
      const result = await usersDataMapper.loginAction(email, password);

      // Génère un token avec JWT
      const token = jwt.sign({
        email: result.email,
        lastName: result.lastName,
      }, process.env.SECRET);

      // On renvoie le json de l'user.
      const user = {
        email: result.email,
        firstName: result.firstName,
        lastName: result.lastName,
      };
      res.json({ user, token });
    } catch (error) {
      res.status(401).json({ message: 'Error d\'authentification' });
    }
  }
}
module.exports = new UsersController();
