const debug = require('debug')('colis:controllers');
const CoreController = require('./CoreController');
const UserDataMapper = require('../../models/usersDataMapper');

/** Class representing a user controller. */
class UserController extends CoreController {
  static dataMapper = UserDataMapper;

  constructor() {
    super();
    debug('userController created');
  }

  async createSecureUser(request, response) {
    debug(`${this.constructor.name} create`);
    const createObj = request.body;
    try {
      const createdUser = await this.constructor.dataMapper.createSecureUser(createObj);
      response.status(201).json(createdUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create user' });
    }
  }

  async findAccountByUserId(request, response) {
    debug(`${this.constructor.name} getAccount`);
    const userId = request.params.id;
    const account = await this.constructor.dataMapper.findAccountByUserId(userId);
    response.json(account);
  }

  async updateUserById(request, response) {
    const userId = request.params.id;
    const updates = request.body;
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
    const carrierId = request.params.id;
    const updated = request.body;
    const updatedCarrier = await this.constructor.dataMapper.updateCarrierById(carrierId, updated);
    if (!updatedCarrier) {
      return response.status(404).send('Transporteur non trouvé');
    }
    return response.json(updatedCarrier);
  }
}

module.exports = new UserController();
