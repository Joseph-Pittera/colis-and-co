// créer la route post login
const express = require('express');
const { usersController } = require('../../controllers/api');

const router = express.Router();

router.route('/login')
  .get(usersController.login)
  .post(usersController.loginAction);

router.route('/signup')
  .get(usersController.signup)
  .post(usersController.signupAction);

router.get('/logout', usersController.logoutAction);

module.exports = router;
