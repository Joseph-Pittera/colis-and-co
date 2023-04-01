const debug = require('debug')('colis:dataMapper');
const CoreDataMapper = require('./CoreDataMapper');
const client = require('./helpers/database');

class UserDataMapper extends CoreDataMapper {
  static tableName = 'users';

  constructor() {
    super();
    debug('user data mapper created');
  }

  async getAllUsers() {
    console.log(`${this.constructor.name} getAllUsers`);
    const preparedQuery = {
      text: `SELECT * FROM '${this.constructor.tableName}'; `,

    };
    const result = await client.query(preparedQuery);
    return result.rows;
  }

  /* async createUser(user) {
    debug(`${this.constructor.name} createUser()`);
    const preparedQuery = {
      text: `INSERT INTO "${this.constructor.tableName}" ("email", "password", "first_name", "last_name", "address", "zipcode", "birth_date", "phone_number", "carrier", "identity_verified", "role", "created_at")
               VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
               RETURNING *`,
      values: [/*
        user.email,
        user.password,
        user.first_name,
        user.last_name,
        user.address,
        user.zipcode,
        user.birth_date,
        user.phone_number,
        user.carrier,
        user.identity_verified,
        user.role,
        user.created_at,
      ],
    };
    const result = await client.query(preparedQuery);
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

  async deleteUser(id) {
    debug(`${this.constructor.name} deleteUser(${id})`);
    const preparedQuery = {
      text: `DELETE FROM "${this.constructor.tableName}" WHERE "id"=$1`,
      values: [id],
    };
    await client.query(preparedQuery);
  } */
}

module.exports = new UserDataMapper();
