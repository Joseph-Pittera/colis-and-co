const bcrypt = require('bcrypt');
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

      // On doit vérifier si l'email et le password de l'utilisateur  existe dans la base de données
      // eslint-disable-next-line max-len
      // on doit faire appel au userDatamapper afin de faire la requête et la stocker dans une variable
      // on va devoir créer la requête dans un userDatamapper
      const user = await usersDataMapper.loginAction(email, password);

      // On renvoie le json de l'user.
      res.json({
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
      });
    } catch (error) {
      res.status(401).json({ message: 'Error' });
    }
  }
}
module.exports = new UsersController();
