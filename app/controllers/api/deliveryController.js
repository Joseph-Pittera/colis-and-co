const debug = require('debug')('colis:controllers');
const CoreController = require('./CoreController');
const DeliveryDataMapper = require('../../models/deliveryDataMapper.js');

/** Class representing a delivery controller. */
class DeliveryController extends CoreController {
  static dataMapper = DeliveryDataMapper;

  constructor() {
    super();
    console.log('deliveryController created');
  }

  // async getAllDeliveries(req, res){
  //   console.log(`${this.constructor.name} getAlldeliveries`);
  //   const deliveries = await this.constructor.dataMapper.findAll();
  //   res.json(deliveries);
  // }
  async getAllDeliveries(req, res, next) {
    console.log(`${this.constructor.name} getAllDeliveries`);
    try {
        const deliveries = await this.constructor.dataMapper.findAll();
        console.log("Deliveries:", deliveries); // Ajouter ce log
        res.json(deliveries);
    } catch (error) {
        console.error("Error in getAllDeliveries:", error); // Ajouter ce log
        next(error);
    }
}


//   async getDeliveriesForUser(request, response) {
//     debug(`${this.constructor.name} getDeliveriesForUser`);
//     const userId = request.params.id;
//     const deliveries = await this.constructor.dataMapper.findAllDeliveriesForUser(userId);
//     response.json(deliveries);
//   }

//   async createDelivery(request, response) {
//     debug(`${this.constructor.name} createDelivery`);
//     const newDelivery = request.body;
//     const createdDelivery = await this.constructor.dataMapper.create(newDelivery);
//     response.status(201).json(createdDelivery);
//   }

//   async updateDelivery(request, response) {
//     debug(`${this.constructor.name} updateDelivery`);
//     const deliveryId = request.params.id;
//     const updatedDelivery = request.body;
//     const result = await this.constructor.dataMapper.modify(deliveryId, updatedDelivery);
//     response.json(result);
//   }

//   async deleteDelivery(request, response) {
//     debug(`${this.constructor.name} deleteDelivery`);
//     const deliveryId = request.params.id;
//     await this.constructor.dataMapper.delete(deliveryId);
//     response.status(204);
//   }
}

module.exports = new DeliveryController();

