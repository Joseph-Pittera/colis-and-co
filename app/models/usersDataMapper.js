const debug = require('debug')('colis:dataMapper');
const CoreDataMapper = require('./CoreDataMapper');
const client = require('./helpers/database');

class UserDataMapper extends CoreDataMapper {
  static tableName = 'users';

  constructor() {
    super();
    debug('user data mapper created');
  }

  async findAccountByUserId(userId) {
    debug(`${this.constructor.name} findAccountByUserId`);
    const query = {
      text: `SELECT * FROM ${this.constructor.tableName} WHERE id = $1`,
      values: [userId],
    };
    const result = await client.query(query);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  }

  async updateUserById(userId, updates) {
    console.log("-------I'am in deliverydatamapper.js");
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

  async findCarrierByUserId(userId) {
    const preparedQuery = {
      text: `SELECT * FROM "${this.constructor.tableName}"  WHERE id = $1 AND carrier = true`,
      values: [userId],
    };
    const { rows } = await client.query(preparedQuery);
    return rows[0];
  }

  async updateCarrierById(userId, updates) {
    debug(`${this.constructor.name} updateCarrierByUserId(${userId}, ${JSON.stringify(updates)})`);
    const setClause = Object.keys(updates)
      .map((key, index) => `"${key}"=$${index + 2}`)
      .join(', ');
    const whereClause = '"id"=$1 AND "carrier"=true';
    const preparedQuery = {
      text: `UPDATE "${this.constructor.tableName}" SET ${setClause} WHERE ${whereClause} RETURNING *`,
      values: [userId, ...Object.values(updates)],
    };
    const result = await client.query(preparedQuery);
    return result.rows[0];
  }
}

module.exports = new UserDataMapper();
