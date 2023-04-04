// Import necessary modules and dependencies
const express = require('express');
const { adminController, deliveryController } = require('../../controllers/api');
const controllerHandler = require('../../controllers/helpers/controllerHandler');
const validate = require('../../validations/validate');
const schemas = require('../../validations/schemas/delivery.schema');

// Create an instance of an Express router
const router = express.Router();

// Define a GET route for all deliveries
router.get('/', controllerHandler(deliveryController.findAll.bind(deliveryController)));

// Define a POST route to create a new delivery
router.post('/', validate(schemas.post, 'body'),controllerHandler(deliveryController.createDelivery.bind(deliveryController)));

// Define a GET route for a specific delivery by ID
router.get('/:id', controllerHandler(deliveryController.getOne.bind(deliveryController)));

// Define a PUT route to update a delivery by ID
router.put('/:id', validate(schemas.patch, 'body'), controllerHandler(deliveryController.updateDeliveryById.bind(deliveryController)));

// Degine a DELETE route to delete a delivery by ID
router.delete('/:id', controllerHandler(deliveryController.delete.bind(deliveryController)));

module.exports = router;
