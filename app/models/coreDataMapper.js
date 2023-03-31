const debug = require('debug')('colis:dataMapper');
const client = require('./helpers/database');

/** Class representing an abstract data mapper. */

class CoreDataMapper {
  static tableName;

  static viewName; // if viewName is defined, it will be used for find methods

  /**
   * fetch all entries
   *
   * @returns {array} array of entries
   */
  async findAll() {
    debug(`${this.constructor.name} findAll`);
    const tableName = this.constructor.viewName || this.constructor.tableName;
    const preparedQuery = {
      text: `SELECT * FROM "${tableName}" ORDER BY "id"`,
    };
    const results = await client.query(preparedQuery);
    return results.rows;
  }

  /**
   * fetch an entry according to its id
   *
   * @param {number} id - id of the entry
   * @returns an entry
   */
  async findByPk(id) {
    debug(`${this.constructor.name} findByPk(${id})`);
    const tableName = this.constructor.viewName || this.constructor.tableName;
    const preparedQuery = {
      text: `SELECT * FROM "${tableName}" WHERE id=$1`,
      values: [id],
    };
    const results = await client.query(preparedQuery);
    return results.rows[0];
  }

  /**
   * create an entry
   *
   * @param {Object} obj - the entry to create
   * @returns {Object} the created entry
   */
  async create(createObj) {
    debug(`${this.constructor.name} create`);
    const fields = [];
    const values = [];
    Object.keys(createObj).forEach((key, index) => {
      fields.push(`"${key}"`);
      values.push(`$${index + 1}`);
    });
    const preparedQuery = {
      text: `
        INSERT INTO "${this.constructor.tableName}"
        (${fields.join(',')}) 
        VALUES (${values.join(',')})
        RETURNING *
      `,
      values: Object.values(createObj),
    };
    const results = await client.query(preparedQuery);
    return results.rows[0];
  }

  /**
   * modify an entry
   *
   * @param {number} id - the entry id
   * @param {Object} obj - the modifications
   * @returns {Object} the modified entry
   */
  async modify(id, modObject) {
    debug(`${this.constructor.name} modify(${id})`);
    const fields = Object.keys(modObject).map((property, index) => `"${property}"=$${index + 1}`);
    const preparedQuery = {
      text: `
        UPDATE "${this.constructor.tableName}"
        SET ${fields.join(',')}  
        WHERE id=$${fields.length + 1}
        RETURNING *
      `,
      values: [...Object.values(modObject), id],
    };
    const results = await client.query(preparedQuery);
    return results.rows[0];
  }

  /**
   * remove an entry
   *
   * @param {number} id - the entry id
   */
  async delete(id) {
    debug(`${this.constructor.name} delete(${id})`);
    const preparedQuery = {
      text: `DELETE FROM "${this.constructor.tableName}" WHERE id=$1`,
      values: [id],
    };
    await client.query(preparedQuery);
  }
}

module.exports = CoreDataMapper;
