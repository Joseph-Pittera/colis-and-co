// Import necessary modules and dependencies
const express = require('express');
const { adminController, deliveryController } = require('../../controllers/api');
const controllerHandler = require('../../controllers/helpers/controllerHandler');
const validate = require('../../validations/validate');
const schemas = require('../../validations/schemas/delivery.schema');

// Create an instance of an Express router
const router = express.Router();

// Define a GET route for all deliveries
router.get('/', (req, res, next) => {
  console.log('Route /delivery called');
  controllerHandler(deliveryController.getAllDeliveries.bind(deliveryController))(req, res, next);
});

// Define a POST route to create a new delivery
router.post('/', validate(schemas.post, 'body'), (req, res, next) => {
  console.log('-------Route /delivery POST called');
  controllerHandler(deliveryController.createDelivery.bind(deliveryController))(req, res, next);
});

// Define a GET route for a specific delivery by ID
router.get('/:id',(req,res,next)=>{
  console.log('Route /delivery/:id called');
  console.log('Requested ID:', req.params.id);
  controllerHandler(deliveryController.getOne.bind(deliveryController))(req, res, next);
});

// Define a PUT route to update a delivery by ID
router.put('/:id', validate(schemas.patch, 'body'), (req, res, next) => {
  console.log('-------Route /delivery put called');
  controllerHandler(deliveryController.updateDeliveryById.bind(deliveryController))(req, res, next);
});

// Degine a DELETE route to delete a delivery by ID
router.delete('/:id', (req, res, next) => {
  console.log('-------Route Delete /delivery put called');
  controllerHandler(deliveryController.delete.bind(deliveryController))(req, res, next);
}); 

module.exports = router;