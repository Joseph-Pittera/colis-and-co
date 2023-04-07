const debug = require('debug')('colis:dataMapper');
const CoreDataMapper = require('./CoreDataMapper');
const { InternalServerError } = require('../errors/InternalServerError');
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
          price,
          zipcode,
          city
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13 
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
          delivery.zipcode,
          delivery.city, 
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
    const result = await client.query(preparedQuery);
    return result.rows[0];
  }

  async getDeliveryByCity(city) {
    debug(`${this.constructor.name} getDeliveryByCity(${city})`);
    const preparedQuery = {
      text: `SELECT * FROM "${this.constructor.tableName}" WHERE city = $1`,
      values: [city],
    };
    const result = await client.query(preparedQuery);
    return result.rows;
  }

  async findByZipcode(zipcode) {
    const query = {
      text: `SELECT *, LEFT(SUBSTRING(zipcode, 1, 2), 2) AS department
             FROM "${this.constructor.tableName}"
             WHERE zipcode LIKE $1 || '%'`,
      values: [zipcode],
    };
    const result = await client.query(query);
    return result.rows;
  }
}

module.exports = new DeliveryDataMapper();
