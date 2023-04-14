// Import necessary modules and dependencies
const express = require('express');
const { deliveryController } = require('../../controllers/api');
const controllerHandler = require('../../controllers/helpers/controllerHandler');
const validate = require('../../validations/validate');
const schemas = require('../../validations/schemas/delivery.schema');
const authenticationJwt = require('../../middlewares/authJwt');
const multer = require('../../middlewares/multer');

// Create an instance of an Express router
const router = express.Router();
/**
 * a delivery type
 *
 * @typedef {object} Delivery
 * @property {number} id - delivery id
 * @property {string} type_of_marchandise - delivery type_of_marchandise
 * @property {number} quantity - delivery quantity
 * @property {number} volume - delivery volume
 * @property {number} length - delivery length
 * @property {number} width - delivery width
 * @property {number} height - delivery height
 * @property {number} weight - delivery weight
 * @property {string} departure_address - delivery departure_address
 * @property {number} zipcode - delivery zipcode
 * @property {string} city - delivery city
 * @property {string} arrival_address - delivery arrival_address
 * @property {number} arrival_zipcode - delivery arrival_zipcode
 * @property {string} arrival_city - delivery arrival_city
 * @property {string} departure_date - delivery departure_date
 * @property {string} arrival_date - delivery arrival_date
 * @property {number} price - delivery price
 * @property {number} creator_id - delivery creator_id
 * @property {number} carrier_id - delivery carrier_id
 * @property {string} created_at - date of creation
 * @property {string} updated_at - date of last update
 */

/**
 * Define a GET route for all deliveries
 * @route GET /deliveries
 * @group Deliveries - Operations about deliveries
 * @returns {object} 200 - An object with "result"
 * @returns {Error}  default - Unexpected error
 */
router.get('/', controllerHandler(deliveryController.findAllDeliveries.bind(deliveryController)));

/**
 * Define a POST route to create a new delivery
 * @route POST /delivery
 * @group Deliveries - Operations about deliveries
 * @param {string} type_of_marchandise.query - delivery type_of_marchandise
 * @param {posint} quantity.query.required - delivery quantity
 * @param {number} volume.query.required - delivery volume
 * @param {number} length.query.required - delivery length
 * @param {number} width.query.required - delivery width
 * @param {number} height.query.required - delivery height
 * @param {number} weight.query.required - delivery weight
 * @param {string} departure_address.query.required - delivery departure_address
 * @param {number} zipcode.query.required - delivery zipcode
 * @param {string} city.query.required - delivery city
 * @param {string} arrival_address.query.required - delivery arrival_address
 * @param {number} arrival_zipcode.query.required - delivery arrival_zipcode
 * @param {string} arrival_city.query.required - delivery arrival_city
 * @param {string} departure_date.query.required - delivery departure_date
 * @param {string} arrival_date.query.required - delivery arrival_date
 * @param {number} price.query.required - delivery price
 * @returns {object} 200 - An object
 * @returns {Error}  500 - Internal server error
 */
router.post('/', multer, validate(schemas.post, 'body'), controllerHandler(deliveryController.createDelivery.bind(deliveryController)));

/**
 * Define a GET route to search delivery by city or zipcode
 * @route GET /deliveries/search
 * @group Deliveries - Operations about deliveries
 * @returns {object} 200 - An object
 * @returns {Error}  500 - Unexpected error
 * @returns {Error}  400
 */
router.get('/search', controllerHandler(deliveryController.findByCityOrZipcode.bind(deliveryController)));

/**
 * Define a GET route for one delivery
 * @route GET /deliveries/:id
 * @group Deliveries - Operations about deliveries
 * @returns {object} 204 - An object with "result"
 */
router.get('/:id', controllerHandler(deliveryController.findByPk.bind(deliveryController)));

/**
 * Define a PUT route to update one delivery
 * @route PUT /deliveries/:id
 * @group Deliveries - Operations about deliveries
 * @returns {object} An object
 */
router.put('/:id/accept', validate(schemas.put, 'body'), controllerHandler(deliveryController.acceptDelivery.bind(deliveryController)));
router.put('/:id', validate(schemas.put, 'body'), controllerHandler(deliveryController.updateDeliveryById.bind(deliveryController)));

/**
 * Define a DELETE route to suppress one delivery
 * @route DELETE /deliveries/:id
 * @group Deliveries - Operations about deliveries
 * @returns {Response} 204
 */
// Degine a DELETE route to delete a delivery by ID

router.delete('/:id', authenticationJwt, controllerHandler(deliveryController.delete.bind(deliveryController)));

module.exports = router;
