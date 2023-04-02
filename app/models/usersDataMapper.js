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

  async updateUser(id, updates) {
    debug(`${this.constructor.name} updateUser(${id}, ${JSON.stringify(updates)})`);
    const setClause = Object.keys(updates)
      .map((key, index) => `"${key}"=$${index + 2}`)
      .join(', ');
    const preparedQuery = {
      text: `UPDATE "${this.constructor.tableName}" SET ${setClause}, "updated_at"=NOW() WHERE "id"=$1 RETURNING *`,
      values: [id, ...Object.values(updates)],
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

  async updateCarrierByUserId(userId, updates) {
    debug(`${this.constructor.name} updateCarrierByUserId(${userId}, ${JSON.stringify(updates)})`);
    const setClause = Object.keys(updates)
      .map((key, index) => `"${key}"=$${index + 2}`)
      .join(', ');
    const preparedQuery = {
      text: `UPDATE "${this.constructor.tableName}" SET ${setClause}, "updated_at"=NOW() WHERE "id"=$1 AND "carrier"=TRUE RETURNING *`,
      values: [userId, ...Object.values(updates)],
    };
    const result = await client.query(preparedQuery);
    return result.rows[0];
  }
}

module.exports = new UserDataMapper();
