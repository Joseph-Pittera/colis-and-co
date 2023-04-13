const debug = require('debug')('colis:controllers');
const CoreController = require('./CoreController');
const DeliveryDataMapper = require('../../models/deliveryDataMapper');
require('dotenv').config();

/** Class representing a delivery controller. */
class DeliveryController extends CoreController {
  static dataMapper = DeliveryDataMapper;

  constructor() {
    super();

    debug('deliveryController created');
  }

  async findAllDeliveries(request, response) {
    debug(`${this.constructor.name} findAllDeliveries`);
    const page = Number(request.query.page) || 1;
    const limit = 5;
    const results = await this.constructor.dataMapper.findAllDeliveries(page, limit);
    response.json(results);
  }

  async createDelivery(request, response) {
    debug(`${this.constructor.name} createDelivery`);
    // Création et Récupération de l'URL de l'image
    const imageUrl = `${process.env.IMAGE_URL}${request.file.filename}`;
    const delivery = request.body;

    const createdDelivery = await this.constructor.dataMapper.createDelivery(delivery, imageUrl);
    response.json(createdDelivery);
  }

  async updateDeliveryById(request, response) {
    debug(`${this.constructor.name} updateDeliveryById`);
    const deliveryId = request.params.id;
    const updates = request.body;
    // eslint-disable-next-line max-len
    const updatedCarrier = await this.constructor.dataMapper.updateDeliveryById(deliveryId, updates);
    return response.json(updatedCarrier);
  }

  async findByCityOrZipcode(request, response) {
    debug(`${this.constructor.name} searchDeliveries`);
    const { city, zipcode } = request.query;

    if (!city && !zipcode) {
      return response.status(400).json({ error: 'Ville ou departement pas trouvé' });
    }

    try {
      const deliveries = await this.constructor.dataMapper.findByCityOrZipcode(city, zipcode);
      return response.json(deliveries);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }
}

module.exports = new DeliveryController();
