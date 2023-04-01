const debug = require('debug')('colis:dataMapper');
const CoreDataMapper = require('./CoreDataMapper');
const client = require('./helpers/database');

/** Class representing an account data mapper. */
class AccountDataMapper extends CoreDataMapper {
  static tableName = 'users';

  constructor() {
    super();
    debug('accountDataMapper created');
  }

  async findAccountByUserId(userId) {
    debug(`${this.constructor.name} findAccountByUserId`);
    const query = { user_id: userId };
    const account = await this.findOne(query);
    return account;
  }

  async updateAccount(userId, updatedAccountData) {
    debug(`${this.constructor.name} updateAccount`);
    const account = await this.findAccountByUserId(userId);
    if (!account) {
      throw new Error(`Account not found for user with id ${userId}`);
    }
    account.updateFromData(updatedAccountData);
    const savedAccount = await account.save();
    return savedAccount;
  }
}

module.exports = new AccountDataMapper();
