const express = require('express');
const { adminController } = require('../controllers');
const controllerHandler = require('../controllers/helpers/controllerHandler');

const router = express.Router();

// Affichage de la page d'administration
router.get('/user', controllerHandler(adminController.getAdminPage.bind(adminController)));

module.exports = router;
