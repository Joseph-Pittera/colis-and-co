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
 * @param {Object} req - The HTTP request object
 * @param {Object} req.file - The file object containing the image of the delivery
 * @param {Object} req.body - The delivery information
 * @param {Object} res - The HTTP response object
 * @param {Function} next - The callback function to handle errors
 * @memberof DeliveryController
 */
  async createDelivery(req, res, next) {
    try {
      debug(`${this.constructor.name} createDelivery`);
      // Création et Récupération de l'URL de l'image
      const imageUrl = `${process.env.IMAGE_URL}${req.file.filename}`;
      const delivery = req.body;

      const createdDelivery = await this.constructor.dataMapper.createDelivery(delivery, imageUrl);
      res.json(createdDelivery);
    } catch (error) {
      next(error);
    }
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

    try {
      const deliveries = await this.constructor.dataMapper.findByCityOrZipcode(city, zipcode);
      return response.json(deliveries);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }
}

module.exports = new DeliveryController();
