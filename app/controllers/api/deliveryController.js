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
 * Handles the creation of one delivery by the user
 * @async
 * @function createDelivery
 * @param {Object} request - The HTTP request object
 * @param {Object} request.file - The file object containing the image of the delivery
 * @param {Object} request.body - The delivery information
 * @param {Object} response - The HTTP response object
 * @param {Function} next - The callback function to handle errors
 * @memberof DeliveryController
 */

  async findAllDeliveries(request, response) {
    debug(`${this.constructor.name} findAllDeliveries`);
    const page = Number(request.query.page) || 1;
    const limit = 5;
    const results = await this.constructor.dataMapper.findAllDeliveries(page, limit);
    response.json(results);
  }

  async createDelivery(request, response) {
    debug(`${this.constructor.name} createDelivery`);
    // Création et Récupération de l'URL de l'image
    let imageUrl;
    if (typeof request.file === 'undefined' || typeof request.file.filename === 'undefined') {
      imageUrl = '';
    } else {
      imageUrl = `${process.env.IMAGE_URL}${request.file.filename}`;
    }
    const delivery = request.body;
    const createdDelivery = await this.constructor.dataMapper.createDelivery(delivery, imageUrl);
    response.json(createdDelivery);
  }

  /**
* Update a delivery with the given ID using the provided data
* @async
* @function updateDeliveryById
* @param {Object} request - The HTTP request object.
* @param {integer} request.params.id - The ID of the delivery to update.
* @param {Object} request.body - The delivery data to use for updating.
* @param {Object} response - The HTTP response object.
* @returns {Object} Returns a JSON object containing the updated delivery information.
* @throws {Error} Throws an error that is passed to the error handling middleware
* @memberof DeliveryController
*/
  async updateDeliveryById(request, response) {
    debug(`${this.constructor.name} updateDeliveryById`);
    const deliveryId = request.params.id;
    const updates = request.body;
    // eslint-disable-next-line max-len
    const updatedCarrier = await this.constructor.dataMapper.updateDeliveryById(deliveryId, updates);
    return response.json(updatedCarrier);
  }

  /**
   * Find deliveries by city or zipcode
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
    debug(`${this.constructor.name} searchDeliveries`);
    const { city, zipcode } = request.query;

    if (!city && !zipcode) {
      return response.status(400).json({ error: 'Ville ou departement pas trouvé' });
    }

    const deliveries = await this.constructor.dataMapper.findByCityOrZipcode(city, zipcode);
    return response.json(deliveries);
  }
}

module.exports = new DeliveryController();
