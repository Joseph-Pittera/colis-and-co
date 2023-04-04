const debug = require('debug')('colis:dataMapper');
const bcrypt = require('bcrypt');
const CoreDataMapper = require('./coreDataMapper');
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
    // On lui indique que c'est la table 'users' qui nous interresse
    const tableName = this.constructor.viewName || this.constructor.tableName;

    debug(`${this.constructor.name} loginAction(${email}`);

    // On construit la requête
    const preparedQuery = {
      text: `
        SELECT email, password, first_name, last_name
        FROM "${tableName}"
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

  /* async comparePasswords(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }

  async hashPassword(password) {
    return bcrypt.hash(password, saltRounds);
  } */

  async loginAction(email, password) {
    const user = await this.getUserByEmail(email);
    console.log(user);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

    console.log(isPasswordCorrect);

    if (!isPasswordCorrect) {
      throw new Error('Invalid email or password');
    }

    return {
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
    };
  }
}

module.exports = new UserDataMapper();
