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
    try {
      const columns = Object.keys(delivery).join(', ');
      const values = Object.values(delivery).map((val) => `'${val}'`).join(', ');
      const preparedQuery = {
        text: `INSERT INTO ${this.constructor.tableName} (${columns}) VALUES (${values}) RETURNING *`,
      };
      const { rows } = await client.query(preparedQuery);
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

  async findByCityOrZipcode(city, zipcode) {
    let preparedQuery;
    let values;

    if (city) {
      preparedQuery = {
        text: `SELECT * FROM "${this.tableName}" WHERE city = $1`,
        values: [city],
      };
    } else if (zipcode) {
      preparedQuery = {
        text: `SELECT *, LEFT(SUBSTRING(zipcode, 1, 2), 2) AS department FROM "${this.tableName}" WHERE zipcode LIKE $1 || '%'`,
        values: [zipcode],
      };
    } else {
      throw new Error('Either city or zipcode must be provided');
    }

    const result = await client.query(preparedQuery);
    return result.rows;
  }
}

module.exports = new DeliveryDataMapper();
