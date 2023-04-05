const jwt = require('jsonwebtoken');
const debug = require('debug')('colis:controllers');
const bcrypt = require('bcrypt');

const CoreController = require('./CoreController');
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

  async loginAction(request, response) {
    try {
      // eslint-disable-next-line max-len
      // afin d'utiliser de manière plus rapide et plus lisible les données du body, on déstructure l'objet body afin de transformer chaque propriété utile en variable simple
      const { email, password } = request.body;

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
      response.json({ user, token });
    } catch (error) {
      response.status(401).json({ message: 'Error d\'authentification' });
    }
  }

  async createSecureUser(request, response) {
    debug(`${this.constructor.name} create`);
    const createObj = request.body;

    const createdUser = await this.constructor.dataMapper.createSecureUser(createObj);
    response.status(201).json(createdUser);
  }

  async findAccountByUserId(request, response) {
    debug(`${this.constructor.name} getAccount`);
    const userId = request.params.id;
    const account = await this.constructor.dataMapper.findAccountByUserId(userId);
    response.json(account);
  }

  async updateUserById(request, response) {
    debug(`${this.constructor.name} updateUserById`);
    const userId = request.params.id;
    const updates = request.body;
    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(updates.password, salt);
      updates.password = hashedPassword;
    }
    const updatedCarrier = await this.constructor.dataMapper.updateUserById(userId, updates);

    return response.json(updatedCarrier);
  }

  async findCarrierByUserId(request, response) {
    debug(`${this.constructor.name} findCarrierByUserId`);
    const userId = request.params.id;
    const carrierInfo = await this.constructor.dataMapper.findCarrierByUserId(userId);
    if (carrierInfo) {
      response.json(carrierInfo);
    } else {
      response.status(404).send('Transporteur non trouvé');
    }
  }

  async updateCarrierById(request, response) {
    debug(`${this.constructor.name} updateCarrierById`);
    const carrierId = request.params.id;
    const updated = request.body;
    const updatedCarrier = await this.constructor.dataMapper.updateCarrierById(carrierId, updated);
    if (!updatedCarrier) {
      return response.status(404).send('Transporteur non trouvé');
    }
    return response.json(updatedCarrier);
  }
}

module.exports = new UsersController();
