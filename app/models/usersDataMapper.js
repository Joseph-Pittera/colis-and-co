const debug = require('debug')('colis:dataMapper');
const bcrypt = require('bcrypt');
const CoreDataMapper = require('./CoreDataMapper');
const client = require('./helpers/database');

const saltRounds = 10;
class UserDataMapper extends CoreDataMapper {
  static tableName = 'users';

  constructor() {
    super();
    debug('user data mapper created');
  }

  async createSecureUser(newUser) {
    // Hasher le mot de passe avant de l'ajouter à la base de données
    const hashedPassword = await bcrypt.hash(newUser.password, saltRounds);

    // Ajouter l'utilisateur à la base de données avec le mot de passe sécurisé
    const columns = Object.keys(newUser).filter((key) => key !== 'password').join(', ');
    const values = Object.values(newUser).filter((val) => val !== newUser.password).map((val) => `'${val}'`).join(', ');
    const preparedQuery = {
      text: `INSERT INTO ${this.constructor.tableName} (${columns}, password) VALUES (${values}, $1) RETURNING *`,
      values: [hashedPassword],
    };
    const results = await client.query(preparedQuery);
    return results.rows[0];
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
    debug(`${this.constructor.name} updateCarrierByUserId(${userId}, ${JSON.stringify(updates)})`);
    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(updates.password, salt);
      updates.password = hashedPassword;
    }

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

  async updateCarrierById(carrierId, updated) {
    debug(`${this.constructor.name} updateCarrierByUserId(${carrierId}, ${JSON.stringify(updated)})`);
    const setClause = Object.keys(updated)
      .map((key, index) => `"${key}"=$${index + 2}`)
      .join(', ');
    const whereClause = '"id"=$1 AND "carrier"=true';
    const preparedQuery = {
      text: `UPDATE "${this.constructor.tableName}" SET ${setClause} WHERE ${whereClause} RETURNING *`,
      values: [carrierId, ...Object.values(updated)],
    };
    const result = await client.query(preparedQuery);
    return result.rows[0];
  }
}

module.exports = new UserDataMapper();
