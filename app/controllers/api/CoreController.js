// Import the 'debug' function from the 'debug' module and set the namespace to 'colis: controllers' (see https://www.npmjs.com/package/debug)

const debug = require('debug')('colis:controllers');

/**
 * Class representing an abstract core controller.
 */
class CoreController {
  static dataMapper;

  /**
   * Async function to get all records from a table and return them as JSON
   * @param {*} _
   * @param {*} response
   */
  async findAll(_, response) {
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
    console.log(`getOne called with ID: ${id}`);
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
    const createObj = request.body;
    try {
      const createdObj = await this.constructor.dataMapper.create(createObj);
      response.status(201).json(createdObj);
    } catch (err) {
      console.error(err);
      response.status(500).json({ message: 'Internal server error' });
    }
  }

  /**
   * Async function to modify an existing record by ID and return the updated record as JSON
   * @param {*} request
   * @param {*} response
   */
  async update(request, response) {
    debug(`${this.constructor.name} updated`);
    const { id } = request.params;
    const modObject = request.body;
    const modifiedItem = await this.constructor.dataMapper.update(id, modObject);
    response.json(modifiedItem);
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
