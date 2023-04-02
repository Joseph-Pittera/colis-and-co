// Import the 'debug' function from the 'debug' module and set the namespace to 'colis: controllers' 'https://www.npmjs.com/package/debug'
const debug = require('debug')('colis:controllers');

/** Class representing an abstract core controller. */
class CoreController {
  static dataMapper;

  /**
   * Async function to get all records from a table and return them as JSON
   * @param {*} _
   * @param {*} response
   */
  async getAll(_, response) {
    debug(`${this.constructor.name} getAll`);
    const results = await this.constructor.dataMapper.findAll();
    response.json(results);
  }

  /**
   * Async function to get one record by ID and return it as JSON or a 204 status if not found
   * @param {*} request
   * @param {*} response
   * @returns
   */

  async getOne(request, response) {
    debug(`${this.constructor.name} getOne`);
    const { id } = request.params;
    const results = await this.constructor.dataMapper.findByPk(id);
    if (results) {
      return response.json(results);
    }
    return response.status(204).send();
  }

  /**
   * Async function to create a new record in the table and return it as JSON
   * @param {*} request
   * @param {*} response
   */
  async create(request, response) {
    debug(`${this.constructor.name} create`);
    const results = await this.constructor.dataMapper.create(request.body);
    response.json(results);
  }

  /**
   * Async function to modify an existing record by ID and return the updated record as JSON
   * @param {*} request
   * @param {*} response
   */
  async modify(request, response) {
    debug(`${this.constructor.name} modify`);
    const { id } = request.params;
    const results = await this.constructor.dataMapper.modify(id, request.body);
    response.json(results);
  }

  /**
   * Async function to delete a record by ID and return a 204 status.
   * @param {*} request
   * @param {*} response
   * @returns
   */
  async delete(request, response) {
    debug(`${this.constructor.name} delete`);
    const { id } = request.params;
    await this.constructor.dataMapper.delete(id);
    return response.status(204).send();
  }
}

module.exports = CoreController;
