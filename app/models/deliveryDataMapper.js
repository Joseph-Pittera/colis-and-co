const debug = require('debug')('colis:dataMapper');
const CoreDataMapper = require('./CoreDataMapper');
const client = require('./helpers/database');
const InternalServerError = require('../errors/InternalServerError');

class DeliveryDataMapper extends CoreDataMapper {
  // Define the table name for this data mapper
  static tableName = 'delivery';

  constructor() {
    super();
    debug('delivery data mapper created');
  }

  async findAllDeliveries(page, limit) {
    debug(`${this.constructor.name} findAllDeliveries ${page} ${limit}`);
    const pageSize = (page - 1) * limit;
    const preparedQuery = {
      text: ` SELECT * FROM "${this.constructor.tableName}" ORDER BY id LIMIT $1 OFFSET $2`,
      values: [limit, pageSize],
    };
    const results = await client.query(preparedQuery);
    return results.rows;
  }

  // Create a new delivery in the database
  async createDelivery(delivery, imageUrl) {
    const columns = Object.keys(delivery).join(', ');
    const values = Object.values(delivery).map((val) => `'${val}'`).join(', ');
    const preparedQuery = {
      text: `INSERT INTO ${this.constructor.tableName} (${columns}, image, creator_id) VALUES (${values}, '${imageUrl}', $1) RETURNING *`,
      values: [delivery.creator_id],
    };
    const { rows } = await client.query(preparedQuery);

    const deliveryId = rows[0].id;
    const query = {
      text: `SELECT delivery.*, users.id AS user_id
             FROM ${this.constructor.tableName} 
             JOIN users ON delivery.creator_id = users.id
             WHERE delivery.id = $1`,
      values: [deliveryId],
    };
    const { rows: [deliveryWithUser] } = await client.query(query);

    return deliveryWithUser;
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

  async findByCityOrZipcode(city, zipcode) {
    let preparedQuery;

    if (city) {
      preparedQuery = {
        text: `SELECT * FROM "${this.constructor.tableName}" WHERE city = $1`,
        values: [city],
      };
    } else if (zipcode) {
      preparedQuery = {
        text: `SELECT *, LEFT(SUBSTRING(zipcode, 1, 2), 2) AS department FROM "${this.constructor.tableName}" WHERE zipcode LIKE $1 || '%'`,
        values: [zipcode],
      };
    } else {
      throw new Error('Entrer la ville ou le codepostal/departement');
    }

    const result = await client.query(preparedQuery);
    return result.rows;
  }
}

module.exports = new DeliveryDataMapper();
