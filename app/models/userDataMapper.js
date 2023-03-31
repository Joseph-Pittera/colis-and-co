const debug = require('debug')('colis:dataMapper');
const CoreDataMapper = require('./coreDataMapper');

/** Class representing a users data mapper. */
class UserDataMapper extends CoreDataMapper {
  static tableName = 'users';

  /**
   * create a users data mapper
   *
   * @augments CoreDataMapper
   */
  constructor() {
    super();
    debug('users data mapper created');
  }
}

module.exports = new UserDataMapper();
