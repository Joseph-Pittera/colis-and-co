// créer la route post login
const express = require('express');
const { usersController } = require('../../controllers/api');
const controllerHandler = require('../../controllers/helpers/controllerHandler');

const router = express.Router();

// la route de l'authentification avec la gestion des erreurs par le controllerHandler
router.post('/login', controllerHandler(usersController.loginAction));

// la route de la connexion
// router.post('/signup', controllerHandler(usersController.signupAction));

// router.get('/logout', controllerHandler(usersController.logoutAction));

module.exports = router;
