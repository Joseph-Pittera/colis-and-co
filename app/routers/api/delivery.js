// Import necessary modules and dependencies
const express = require('express');
const path = require('path');
const { deliveryController } = require('../../controllers/api');
const controllerHandler = require('../../controllers/helpers/controllerHandler');
const validate = require('../../validations/validate');
const schemas = require('../../validations/schemas/delivery.schema');
const authenticationJwt = require('../../middlewares/authJwt');
const multer = require('../../middlewares/multer');

// Create an instance of an Express router
const router = express.Router();

// Define a GET route for all deliveries
router.get('/', controllerHandler(deliveryController.findAll.bind(deliveryController)));

// Define a POST route to create a new delivery
router.post('/', multer, validate(schemas.post, 'body'), controllerHandler(deliveryController.createDelivery.bind(deliveryController)));

// Define a GET route for search param city or zipcode
router.get('/search', controllerHandler(deliveryController.findByCityOrZipcode.bind(deliveryController)));

// Define a GET route for a specific delivery by ID
router.get('/:id', authenticationJwt, controllerHandler(deliveryController.findByPk.bind(deliveryController)));

// Define a PUT route to update a delivery by ID
router.put('/:id', authenticationJwt, validate(schemas.patch, 'body'), controllerHandler(deliveryController.updateDeliveryById.bind(deliveryController)));

// Define a DELETE route to delete a delivery by ID
router.delete('/:id', authenticationJwt, controllerHandler(deliveryController.delete.bind(deliveryController)));

// Define a GET route to show delivery images
router.get('/images', express.static(path.join(__dirname, 'images')));
module.exports = router;
