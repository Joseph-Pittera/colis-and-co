const express = require('express');
const { adminController, usersController } = require('../../controllers/api');
const controllerHandler = require('../../controllers/helpers/controllerHandler');

const router = express.Router();

// Affichage de la page d'administration
// router.get('/user', controllerHandler(adminController.getProfile.bind(adminController)));
router.get('/', (req, res, next) => {
    console.log('Route /users called');
    controllerHandler(usersController.getAllUsers.bind(usersController))(req, res, next);
  });

module.exports = router;
