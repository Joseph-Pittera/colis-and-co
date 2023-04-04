const debug = require('debug')('colis:controllers');
const CoreController = require('./CoreController');
const DeliveryDataMapper = require('../../models/deliveryDataMapper');
const { Pool } = require('pg');

/** Class representing a delivery controller. */
class DeliveryController extends CoreController {
  static dataMapper = DeliveryDataMapper;

  constructor() {
    super();
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });
    console.log('deliveryController created');
  }


async createDelivery(req, res, next) {
  console.log(`${this.constructor.name} createDelivery`);
  try {
      const deliverys = req.body;
      const deliveries = await this.constructor.dataMapper.createDelivery(deliverys);
      console.log("Deliveries:", deliveries); // Ajouter ce log
      res.json(deliveries);
  } catch (error) {
      console.error("Error in getAllDeliveries:", error); // Ajouter ce log
      next(error);
  }
}

async updateDeliveryById(request, response) {
  console.log("-------I'am in deliveryController.js");
  const deliveryId = request.params.id;
  const updates = request.body;
  const updatedCarrier = await this.constructor.dataMapper.updateDeliveryById(deliveryId, updates);
  
  return response.json(updatedCarrier);
}


}
module.exports = new DeliveryController();

