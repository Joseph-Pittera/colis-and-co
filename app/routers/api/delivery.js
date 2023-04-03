const express = require('express');
const { adminController, deliveryController } = require('../../controllers/api');
const controllerHandler = require('../../controllers/helpers/controllerHandler');
const validate = require('../../validations/validate');
const schemas = require('../../validations/schemas/delivery.schema');

const router = express.Router();

// Affichage de la page d'administration
// router.get('/user', controllerHandler(adminController.getProfile.bind(adminController)));
router.get('/', (req, res, next) => {
  console.log('Route /delivery called');
  controllerHandler(deliveryController.getAllDeliveries.bind(deliveryController))(req, res, next);
});

router.get('/:id',(req,res,next)=>{
  console.log('Route /delivery/:id called');
  console.log('Requested ID:', req.params.id);
  controllerHandler(deliveryController.getOne.bind(deliveryController))(req, res, next);
});

router.post('/', validate(schemas.post, 'body'), (req, res, next) => {
  console.log('Route /delivery POST called');
  controllerHandler(deliveryController.create.bind(deliveryController))(req, res, next);
});
module.exports = router;