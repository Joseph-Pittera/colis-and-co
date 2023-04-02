const express = require('express');
const { adminController, deliveryController } = require('../../controllers/api');
const controllerHandler = require('../../controllers/helpers/controllerHandler');

const router = express.Router();

// Affichage de la page d'administration
// router.get('/user', controllerHandler(adminController.getProfile.bind(adminController)));
router.get('/', (req, res, next) => {
    console.log('Route /delivery called');
    controllerHandler(deliveryController.getAllDeliveries.bind(deliveryController))(req, res, next);
  });

module.exports = router;

// const express = require('express');
// const router = express.Router();

// router.get('/', (req, res) => {
//   res.json({ message: 'Hello from /delivery' });
// });

// module.exports = router;
