const debug = require('debug')('colis:controllers');
const CoreController = require('./CoreController');
const AccountDataMapper = require('../../models/accountDataMapper');

/** Class representing an account controller. */
class AccountController extends CoreController {
  static dataMapper = AccountDataMapper;

  constructor() {
    super();
    debug('accountController created');
  }

  async getAccount(request, response) {
    debug(`${this.constructor.name} getAccount`);
    const accountId = request.user.id; // assuming you're using authentication middleware to attach the user object to the request
    const account = await this.constructor.dataMapper.findAccountByUserId(accountId);
    response.json(account);
  }

  async updateAccount(request, response) {
    debug(`${this.constructor.name} updateAccount`);
    const accountId = request.user.id;
    // assuming you're using authentication middleware to attach the user object to the request
    const updatedAccountData = request.body;
    const updatedAccount = await this.constructor.dataMapper.update(accountId, updatedAccountData);
    response.json(updatedAccount);
  }
}

module.exports = new AccountController();
