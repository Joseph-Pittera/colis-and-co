const express = require('express');
const { usersController } = require('../../controllers/api');
const controllerHandler = require('../../controllers/helpers/controllerHandler');
const validate = require('../../validations/validate');

const { post: usersPostSchema, patch: usersPatchSchema } = require('../../validations/schemas/users.schema');

const router = express.Router();

router.get('user/account', controllerHandler(usersController.getAllUsers.bind(usersController)));
router.patch('user/account', validate(usersPatchSchema, 'body'), controllerHandler(usersController.updateUser.bind(usersController)));

module.exports = router;
