const express = require('express');
const { accountController } = require('../../controllers/api');
const controllerHandler = require('../../controllers/helpers/controllerHandler');
const validate = require('../../validations/validate');

const { patch: accountPatchSchema } = require('../../validations/schemas/users.schema');

const router = express.Router();

router.get('/user/account', controllerHandler(accountController.getAccount.bind(accountController)));
router.patch('/user/account', validate(accountPatchSchema, 'body'), controllerHandler(accountController.updateAccount.bind(accountController)));

module.exports = router;
