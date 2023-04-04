const debug = require('debug')('colis:dataMapper');
const CoreDataMapper = require('./CoreDataMapper');
const client = require('./helpers/database');

class DeliveryDataMapper extends CoreDataMapper {
  // Define the table name for this data mapper
  static tableName = 'delivery';

  constructor() {
    super();
    debug('delivery data mapper created');
  }

  // Create a new delivery in the database
  async createDelivery(delivery) {
    // const Delivery = req.body;
    try {
      const { rows } = await client.query(
        `
        INSERT INTO "delivery" (
          type_of_marchandise,
          quantity,
          volume,
          length,
          width,
          height,
          departure_address,
          arrival_address,
          departure_date,
          arrival_date,
          price
          
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
        ) RETURNING *
      `,
        [
          delivery.type_of_marchandise,
          delivery.quantity,
          delivery.volume,
          delivery.length,
          delivery.width,
          delivery.height,
          delivery.departure_address,
          delivery.arrival_address,
          delivery.departure_date,
          delivery.arrival_date,
          delivery.price,
        ],
      );
      return rows[0];
    } catch (err) {
      console.error(err);
      throw new InternalServerError(err);
    }
  }

  // Update a delivery by its id
  async updateDeliveryById(userId, updates) {
    debug(`${this.constructor.name} updateCarrierByUserId(${userId}, ${JSON.stringify(updates)})`);
    const setClause = Object.keys(updates)
      .map((key, index) => `"${key}"=$${index + 2}`)
      .join(', ');
    const preparedQuery = {
      text: `UPDATE "${this.constructor.tableName}" SET ${setClause}  WHERE id =$1  RETURNING *`,
      values: [userId, ...Object.values(updates)],
    };
    console.log(preparedQuery);
    const result = await client.query(preparedQuery);
    return result.rows[0];
  }
}

module.exports = new DeliveryDataMapper();
