const debug = require('debug')('oblog:controllers');
const CoreController = require('./CoreController');
const deliveryDataMapper = require('../../models/deliveryDataMapper');

/** Class representing a delivery controller. */
class DeliveryController extends CoreController {
  static dataMapper = deliveryDataMapper;

  constructor() {
    super();
    debug('deliveryController created');
  }

  async getDeliveriesForUser(request, response) {
    debug(`${this.constructor.name} getDeliveriesForUser`);
    const userId = request.params.id;
    const deliveries = await this.constructor.dataMapper.findAllDeliveriesForUser(userId);
    response.json(deliveries);
  }

  async createDelivery(request, response) {
    debug(`${this.constructor.name} createDelivery`);
    const newDelivery = request.body;
    const createdDelivery = await this.constructor.dataMapper.create(newDelivery);
    response.status(201).json(createdDelivery);
  }

  async updateDelivery(request, response) {
    debug(`${this.constructor.name} updateDelivery`);
    const deliveryId = request.params.id;
    const updatedDelivery = request.body;
    const result = await this.constructor.dataMapper.modify(deliveryId, updatedDelivery);
    response.json(result);
  }

  async deleteDelivery(request, response) {
    debug(`${this.constructor.name} deleteDelivery`);
    const deliveryId = request.params.id;
    await this.constructor.dataMapper.delete(deliveryId);
    response.sendStatus(204);
  }
}

module.exports = new DeliveryController();
