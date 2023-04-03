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
    console.log(preparedQuery.text);
    const results = await client.query(preparedQuery);
    return results.rows[0];
  }

  // Modify un élément dans la table correspondant à la classe appelante à partir de son ID
  async update(id, modObject) {
    debug(`${this.constructor.name} modify(${id})`);
    const modifiedItem = { ...modObject };
    const columns = Object.keys(modifiedItem).map((key) => `${key} = '${modifiedItem[key]}'`).join(', ');
    const preparedQuery = {
      text: `UPDATE ${this.constructor.tableName} SET ${columns} WHERE id = $1 RETURNING *`,
      values: [id],
    };
    const results = await client.query(preparedQuery);
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
