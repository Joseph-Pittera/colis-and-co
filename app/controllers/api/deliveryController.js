const debug = require('debug')('colis:controllers');
const CoreController = require('./CoreController');
const DeliveryDataMapper = require('../../models/deliveryDataMapper.js');
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


// async create(req, res) {
//   console.log("--------------------------Iam in deliveyController");
//   const delivery = req.body;
//   try {
//     const { rows } = await this.pool.query(`
//       INSERT INTO delivery (
//         type_of_marchandise,
//         quantity,
//         volume,
//         length,
//         width,
//         height,
//         departure_address,
//         arrival_address,
//         departure_date,
//         arrival_date,
//         price
        
//       ) VALUES (
//         $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
//       ) RETURNING *
//     `,
//     [
//       delivery.type_of_marchandise,
//       delivery.quantity,
//       delivery.volume,
//       delivery.length,
//       delivery.width,
//       delivery.height,
//       delivery.departure_address,
//       delivery.arrival_address,
//       delivery.departure_date,
//       delivery.arrival_date,
//       delivery.price,
//     ]);
//     res.status(201).send(rows[0]);
//   } catch (err) {
//     console.error(err);
//     throw new InternalServerError(err);
//   }
// }
  

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

