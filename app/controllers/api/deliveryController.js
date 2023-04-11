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
    try {
      debug(`${this.constructor.name} createDelivery`);
      const delivery = req.body;
      const createdDelivery = await this.constructor.dataMapper.createDelivery(delivery);
      res.json(createdDelivery);
    } catch (error) {
      next(error);
    }
  }

  async updateDeliveryById(request, response) {
    debug(`${this.constructor.name} updateDeliveryById`);
    const deliveryId = request.params.id;
    const updates = request.body;
    const updatedCarrier = await this.constructor.dataMapper.updateDeliveryById(deliveryId, updates);
    return response.json(updatedCarrier);
  }

  async findByCityOrZipcode(request, response) {
    debug(`${this.constructor.name} searchDeliveries`);
    const city = request.query.city ? String(request.query.city) : undefined;
    const zipcode = request.query.zipcode ? String(request.query.zipcode) : undefined;
    const deliveries = await this.constructor.dataMapper.findByCityOrZipcode(city, zipcode);
    return response.json(deliveries);
  }
}
module.exports = new DeliveryController();
