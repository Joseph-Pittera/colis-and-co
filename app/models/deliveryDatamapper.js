const debug = require('debug')('colis:dataMapper');
const CoreDataMapper = require('./coreDataMapper');

/** Class representing a delivery data mapper. */
class DeliveryDataMapper extends CoreDataMapper {
  static tableName = 'delivery';

  /**
   * create a delivery data mapper
   *
   * @augments CoreDataMapper
   */
  constructor() {
    super();
    debug('delivery data mapper created');
  }
}

module.exports = new DeliveryDataMapper();
