const express = require('express');
const { usersController } = require('../../controllers/api');
const controllerHandler = require('../../controllers/helpers/controllerHandler');
const schemas = require('../../validations/schemas/users.schema');
const validate = require('../../validations/validate');

const router = express.Router();

// GET /api/users : Récuperer toutes les comptes
router.get('/', controllerHandler(usersController.findAll.bind(usersController)));
// GET api/users/:id: Récuperer une compte en particulier
router.get('/:id', controllerHandler(usersController.getOne.bind(usersController)));
// GET /api/users/:id/account : Récupérer les informations du compte d'un utilisateur spécifique
router.get('/:id/account', controllerHandler(usersController.findAccountByUserId.bind(usersController)));
// PUT /api/users/:id/account : Modifier les informations du compte d'un utilisateur spécifique
router.put('/:id/account', validate(schemas.put, 'body'), controllerHandler(usersController.updateUserById.bind(usersController)));
// DELETE /api/users/:id/account : Supprimer le compte d'un utilisateur spécifique
router.delete('/:id/account', controllerHandler(usersController.delete.bind(usersController)));
// GET /api/users/:id/carrier : Récupérer les informations du transporteur d'un utilisateur
router.get('/:id/carrier', controllerHandler(usersController.findCarrierByUserId.bind(usersController)));
// PUT /api/users/:id/carrier : Modifier les informations du transporteur d'un utilisateur
// router.put('/:id/carrier ', validate(schemas.patch, 'body'), (req, res, next) => {
//   console.log('-------Route /:id/carrier put called');
//   controllerHandler(usersController.update.bind(usersController))(req, res, next);
// });
router.put('/:id/carrier ', validate(schemas.patch, 'body'), (req, res, next) => {
  console.log('-------Middleware for PUT /:id/carrier called');
  controllerHandler(usersController.updateUserById.bind(usersController))(req, res, next);
});
// DELETE /api/users/:id/carrier : Supprimer les informations du transporteur d'un utilisateur
router.delete('/:id/carrier', controllerHandler(usersController.delete.bind(usersController)));

module.exports = router;
