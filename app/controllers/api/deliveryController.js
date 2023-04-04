const debug = require('debug')('colis:controllers');
const CoreController = require('./CoreController');
const DeliveryDataMapper = require('../../models/deliveryDataMapper');

/** Class representing a delivery controller. */
class DeliveryController extends CoreController {
  static dataMapper = DeliveryDataMapper;

  constructor() {
    super();

    debug('deliveryController created');
  }

  async createDelivery(req, res, next) {
    debug(`${this.constructor.name} createDelivery`);
    try {
      const deliverys = req.body;
      const deliveries = await this.constructor.dataMapper.createDelivery(deliverys);
      res.json(deliveries);
    } catch (error) {
      console.error('Error in getAllDeliveries:', error); // Ajouter ce log
      next(error);
    }
  }

  async updateDeliveryById(request, response) {
    const deliveryId = request.params.id;
    const updates = request.body;
    const updatedCarrier = await this.constructor.dataMapper.updateDeliveryById(deliveryId, updates);
    return response.json(updatedCarrier);
  }
}
module.exports = new DeliveryController();
