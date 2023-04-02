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

  async findAccountByUserId(request, response) {
    debug(`${this.constructor.name} getAccount`);
    const userId = request.user.id;
    const account = await this.constructor.dataMapper.findAccountByUserId(userId);
    response.json(account);
  }

  async updateUser(request, response) {
    debug(`${this.constructor.name} updateAccount`);
    const accountId = request.user.id;
    // assuming you're using authentication middleware to attach the user object to the request
    const updatedAccountData = request.body;
    const updatedAccount = await this.constructor.dataMapper.update(accountId, updatedAccountData);
    response.json(updatedAccount);
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

  async updateCarrierByUserId(request, response) {
    const userId = request.params.id;
    const updates = request.body;
    const updatedCarrier = await this.usersDataMapper.updateCarrierByUserId(userId, updates);
    if (!updatedCarrier) {
      return response.status(404).send('Transporteur non trouvé');
    }

    return response.json(updatedCarrier);
  }
}
module.exports = new UserController();
