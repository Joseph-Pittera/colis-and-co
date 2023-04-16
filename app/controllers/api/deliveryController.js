const debug = require('debug')('colis:controllers');
const CoreController = require('./CoreController');
const DeliveryDataMapper = require('../../models/deliveryDataMapper');
require('dotenv').config();

/** Class representing a delivery controller. */
class DeliveryController extends CoreController {
  static dataMapper = DeliveryDataMapper;

  /**
   * Creates an instance of DeliveryController.
   * @memberof DeliveryController
   */
  constructor() {
    super();

    debug('deliveryController created');
  }

  /**
* Retrieves a list of deliveries from the database, paginated and limited, and returns them as a JSON response
* @async
* @function findAllDeliveries
* @param {object} request - The request object containing the page number for pagination
* @param {object} response - The response object.
* @memberof DeliveryController
*/
  async findAllDeliveries(request, response) {
    // Logs a debug message with the class name and method name
    debug(`${this.constructor.name} findAllDeliveries`);
    // Extracts the page number from the query parameter, defaults to 1 if not provided
    const page = Number(request.query.page) || 1;
    // Sets the limit for number of records to retrieve
    const limit = 15;
    // Retrieves the deliveries from the database using the dataMapper
    const results = await this.constructor.dataMapper.findAllDeliveries(
      page,
      limit,
    );
    // Sends the results as a JSON response
    response.json(results);
  }

  /**
   * Creates a new delivery record in the database with an optional image URL and returns the created record as a JSON response
   * @async
   * @function createDelivery
   * @param {Object} request - The HTTP request object
   * @param {Object} request.file - The file object containing the optional image file
   * @param {Object} request.body - The delivery information
   * @param {Object} response - The HTTP response object
   * @memberof DeliveryController
   */
  async createDelivery(request, response) {
    // Logs a debug message with the class name and method name
    debug(`${this.constructor.name} createDelivery`);
    // Creates and retrieves the image URL for the delivery, if provided
    let imageUrl;
    if (
      typeof request.file === 'undefined'
      || typeof request.file.filename === 'undefined'
    ) {
      imageUrl = '';
    } else {
      imageUrl = `${process.env.IMAGE_URL}${request.file.filename}`;
    }
    // Retrieves the delivery information from the request body
    const delivery = request.body;
    // Creates a new delivery record in the database using the dataMapper
    const createdDelivery = await this.constructor.dataMapper.createDelivery(
      delivery,
      imageUrl,
    );
    // Sends the created delivery record as a JSON response
    response.json(createdDelivery);
  }

  /**
   * Updates a delivery with the given ID using the provided updates and returns the updated record as a JSON response
   * @async
   * @function updateDeliveryById
   * @param {Object} request - The HTTP request object
   * @param {integer} request.params.id - The ID of the delivery to update
   * @param {Object} request.body - The delivery data to use for updating
   * @param {Object} response - The HTTP response object.
   * @returns {Object} Returns a JSON object containing the updated delivery information.
   * @memberof DeliveryController
   */
  async updateDeliveryById(request, response) {
    // Logs a debug message with the class name and method name
    debug(`${this.constructor.name} updateDeliveryById`);
    // Extracts the ID of the delivery to update from the request parameters
    const deliveryId = request.params.id;
    // Extracts the updates to apply to the delivery record from the request body
    const updates = request.body;
    // Updates the delivery record in the database using the dataMapper
    const updatedCarrier = await this.constructor.dataMapper.updateDeliveryById(
      deliveryId,
      updates,
    );
    // Sends the updated delivery record as a JSON response
    return response.json(updatedCarrier);
  }

  /**
   * Searches for delivery records in the database by city or zipcode and returns the matching records as a JSON response
   * @async
   * @function findByCityOrZipcode
   * @param {Object} request - The HTTP request object
   * @param {string} request.query.city - The city to search for deliveries in
   * @param {string} request.query.zipcode - The zipcode to search for deliveries in
   * @param {Object} response - The HTTP response object
   * @returns {Object} Returns a JSON object containing an array of delivery objects matching the search criteria
   * @memberof DeliveryController
   */
  async findByCityOrZipcode(request, response) {
    // Logs a debug message with the class name and method name
    debug(`${this.constructor.name} searchDeliveries`);
    // Extracts the search criteria (city and/or zipcode) from the request query parameters
    const { city, zipcode } = request.query;
    // Checks that at least one search criteria is provided
    if (!city && !zipcode) {
      return response
        .status(400)
        .json({ error: 'Ville ou departement pas trouvé' });
    }
    // Searches for delivery records in the database using the dataMapper and the provided search criteria
    const deliveries = await this.constructor.dataMapper.findByCityOrZipcode(
      city,
      zipcode,
    );
    // Sends the matching delivery records as a JSON response
    return response.json(deliveries);
  }
}

module.exports = new DeliveryController();
