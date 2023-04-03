//Import the 'debug' function from the 'debug' module and set the namespace to 'colis: controllers' 'https://www.npmjs.com/package/debug'
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
  // async create(request, response) {
  //   debug(`${this.constructor.name} create`);
  //   const results = await this.constructor.dataMapper.create(request.body);
  //   response.json(results);
  // }
  // async create(req, res) {
  //   const delivery = req.body;
  //   try {
  //     const { rows } = await this.pool.query(`
  //       INSERT INTO delivery (
  //         type_of_marchandise,
  //         quantity,
  //         volume,
  //         length,
  //         width,
  //         height,
  //         departure_address,
  //         arrival_address,
  //         departure_date,
  //         arrival_date,
  //         price
          
  //       ) VALUES (
  //         $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
  //       ) RETURNING *
  //     `,
  //     [
  //       delivery.type_of_marchandise,
  //       delivery.quantity,
  //       delivery.volume,
  //       delivery.length,
  //       delivery.width,
  //       delivery.height,
  //       delivery.departure_address,
  //       delivery.arrival_address,
  //       delivery.departure_date,
  //       delivery.arrival_date,
  //       delivery.price,
  //     ]);
  //     res.status(201).send(rows[0]);
  //   } catch (err) {
  //     console.error(err);
  //     throw new InternalServerError(err);
  //   }
  // }

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
