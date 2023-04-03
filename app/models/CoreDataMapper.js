const debug = require('debug')('colis:dataMapper');
const client = require('./helpers/database');

class CoreDataMapper {
  static tableName;

  static viewName; // if viewName is defined, it will be used for find methods

  // Trouver tous les éléments dans la table ou la vue correspondant à la classe appelante
  async findAll() {
    debug(`${this.constructor.name} findAll`);
    const tableName = this.constructor.viewName || this.constructor.tableName;
    const preparedQuery = {
      text: `SELECT * FROM "${tableName}" ORDER BY "id";`,
    };
    const results = await client.query(preparedQuery);
    return results.rows;
  }

  // Trouver un élément dans la table ou la vue correspondant à la classe
  // appelante à partir de son ID
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

  // Crée un nouvel élément dans la table correspondant à la classe appelante
  async create(createObj) {
    debug(`${this.constructor.name} create`);
    const columns = Object.keys(createObj).join(', ');
    const values = Object.values(createObj).map((val) => `'${val}'`).join(', ');
    const preparedQuery = {
      text: `INSERT INTO ${this.constructor.tableName} (${columns}) VALUES (${values}) RETURNING *`,
    };
    const results = await client.query(preparedQuery);
    return results.rows[0];
  }

  // Update  un élément dans la table correspondant à la classe appelante à partir de son ID
  async update(id, modObject) {
    // Ajoute un message de debug pour suivre l'exécution de la fonction
    debug(`${this.constructor.name} modify(${id})`);
    // Fait une copie de l'objet de modification pour éviter de modifier l'original
    const modifiedItem = { ...modObject };
    // Crée une chaîne de caractères contenant chaque paire clé-valeur sous forme de colonne pour la requête SQL
    const columns = Object.keys(modifiedItem).map((key) => `${key} = '${modifiedItem[key]}'`).join(', ');
    // Prépare la requête SQL avec le nom de la table, les colonnes à modifier et l'ID de l'élément à modifier
    const preparedQuery = {
      text: `UPDATE ${this.constructor.tableName} SET ${columns} WHERE id = $1 RETURNING *`,
      values: [id],
    };
    // Exécute la requête SQL en utilisant le client de la base de données et récupère les résultats
    const results = await client.query(preparedQuery);
    // Renvoie le premier élément de la réponse (il ne devrait y en avoir qu'un puisque l'ID est unique)
    return results.rows[0];
  }

  // Delete un élément dans la table correspondant à la classe appelante à partir de son ID
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
