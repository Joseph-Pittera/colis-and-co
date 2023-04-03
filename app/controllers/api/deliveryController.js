const debug = require('debug')('colis:controllers');
const CoreController = require('./coreController');
const deliveryDataMapper = require('../../models/deliveryDatamapper');

/** Class representing a delivery controller */
class DeliveryController extends CoreController {
  static dataMapper = deliveryDataMapper;

  /**
   * create a delivery controller
  *
  * @augments CoreController
  */
  constructor() {
    super();
    debug('delivery Controller created');
  }
}

module.exports = new DeliveryController();
