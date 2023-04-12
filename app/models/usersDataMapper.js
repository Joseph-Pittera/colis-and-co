const debug = require('debug')('colis:dataMapper');
const bcrypt = require('bcrypt');
const CoreDataMapper = require('./CoreDataMapper');
const client = require('./helpers/database');

const saltRounds = 10;

/** Class representing a users data mapper. */
class UserDataMapper extends CoreDataMapper {
  static tableName = 'users';

  /**
   * create a users data mapper
   *
   * @augments CoreDataMapper
   */
  constructor() {
    super();
    debug('users data mapper created');
  }

  // On créé la méthode loginAction

  async getUserByEmail(email) {
    debug(`${this.constructor.name} loginAction(${email}`);

    // On construit la requête
    const preparedQuery = {
      text: `
        SELECT email, password, first_name, last_name
        FROM "${this.constructor.tableName}"
        WHERE email = $1 
        ORDER BY "id"
      `,
      values: [email],
    };

    // On stocke le résultat dans une variable
    const result = await client.query(preparedQuery);

    // On stocke le résultat sous forme d'un tableau
    return result.rows[0];
  }

  async loginAction(email, password) {
    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new Error('Invalid email or password');
    }

    return {
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
    };
  }

  async findByEmail(email) {
    debug(`${this.constructor.name} findByEmail`);
    const preparedQuery = {
      text: `SELECT * FROM ${this.constructor.tableName} WHERE email = $1`,
      values: [email],
    };
    const results = await client.query(preparedQuery);
    return results.rows[0];
  }

  async createSecureUser(newUser) {
    debug(`${this.constructor.name} CreateSecureUser`);
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

  async deleteUserById(id) {
    debug(`${this.constructor.name} delete(${id})`);
    const preparedQuery = {
      text: `DELETE FROM "${this.constructor.tableName}" WHERE id=$1`,
      values: [id],
    };
    await client.query(preparedQuery);
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
