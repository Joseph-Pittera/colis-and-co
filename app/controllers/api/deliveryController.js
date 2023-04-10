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

  async getDeliveryByCity(request, response) {
    debug(`${this.constructor.name} getDeliveryByCity`);
    const { city } = request.params;
    const deliveries = await this.constructor.dataMapper.getDeliveryByCity(city);
    return response.json(deliveries);
  }

  async findByZipcode(request, response) {
    debug(`${this.constructor.name} getByZipcode`);
    const { zipcode } = request.params;
    const deliveriesDepart = await this.constructor.dataMapper.findByZipcode(zipcode);
    return response.json(deliveriesDepart);
  }
}
module.exports = new DeliveryController();
