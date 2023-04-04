const debug = require('debug')('colis:dataMapper');
const CoreDataMapper = require('./coreDataMapper');
const client = require('./helpers/database');

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

  async loginAction(email, password) {
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
    const user = result.rows[0];

    // On vérifie si l'user et le MdP est correct
    if (!user) {
      throw new Error('Invalid');
    }

    // On retourne les informations de l'user
    return user;
  }
}

module.exports = new UserDataMapper();
