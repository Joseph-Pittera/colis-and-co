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
    // afin d'utiliser de manière plus rapide et plus lisble les données du body, on destructure l'objet body afin de transformer chaque propriété utile en variable simple
    const { email, password } = req.body;

    // On doit vérifier si l'email et le password de l'utilisateur  existe dans la base de données
    // on doit faire appel au userDatamapper afin de faire la requete et la stocker dans une variable
    // on va devoir créer la requete dans un userDatamapper
    try {
      const user = await this.constructor.dataMapper.loginAction(email, password);

      // On renvoie le json de l'user.
      res.json(user);
    } catch (error) {
      res.status(401).json({ message: 'Error' });
    }

    /* const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Erreur d\'authentification' });
    } */

    // On renvoie le json de l'user.
    res.json({
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
    });

    // On bascule dans le userDatamapper pour faire la requete et récupérer les données
  }
}
module.exports = new UsersController();
