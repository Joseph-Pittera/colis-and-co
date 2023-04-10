const express = require('express');
const { usersController } = require('../../controllers/api');
const controllerHandler = require('../../controllers/helpers/controllerHandler');
const schemas = require('../../validations/schemas/users.schema');
const validate = require('../../validations/validate');
const userAuth = require('../../validations/schemas/userAuth.schema');
const authenticationJwt = require('../../middlewares/authJwt');

const router = express.Router();
/**
 * Récupère tous les comptes
 * @route GET /users
 * @group Users - Operations about user
 * @returns {object} 200 - An object with "result"
 * @returns {Error}  default - Unexpected error
 */
// GET /api/users : Récuperer tous les comptes
router.get('/', controllerHandler(usersController.findAll.bind(usersController)));
/**
 * Connexion de l'utilisateur
 * @route POST /users/login
 * @group Users - Operations about user
 * @param {string} email.query.required - email
 * @param {string} password.query.required - user's password
 * @returns {object} 200 - An object with "result"
 * @returns {Error}  default - Unexpected error
 */
router.post('/login', validate(userAuth.post, 'body'), controllerHandler(usersController.loginAction.bind(usersController)));
/**
 * Création d'un compte utilisateur
 * @route POST /users/signin
 * @group Users - Operations about user
 * @param {string} email.query.required - email
 * @param {string} password.query.required - user's password
 * @param {string} firstname.query.required - user's firstname
 * @param {string} lastname.query.required - user's lastname
 * @param {string} address.query.required - user's address
 * @param {zipcode} zipcode.query.required - user's zipcode
 * @param {Date} birthdate.query - user's birthdate
 * @param {string} phonenumber.query.required - user's phonenumber
 * @returns {object} 200 - An object with "result"
 * @returns {Error}  default - Unexpected error
 */
// POST /api/users/signin : Crééer un nouvel utilisateur
router.post('/register', validate(schemas.post, 'body'), controllerHandler(usersController.createSecureUser.bind(usersController)));
/**
 * Récupère un compte en particulier
 * @route GET /users/:id
 * @group Users - Operations about user
 * @returns {object} 200 - An object with "result"
 * @returns {Error}  default - Unexpected error
 */
// GET api/users/:id: Récuperer un compte en particulier
router.get('/:id', authenticationJwt, controllerHandler(usersController.getOne.bind(usersController)));
/**
 * Récupère les informations du compte d'un utilisateur spécifique
 * @route GET /users/:id/account
 * @group Users - Operations about user
 * @returns {object} 200 - An object with "result"
 * @returns {Error}  default - Unexpected error
 */
// GET /api/users/:id/account : Récupérer les informations du compte d'un utilisateur spécifique
router.get('/:id/account', authenticationJwt, controllerHandler(usersController.findAccountByUserId.bind(usersController)));
/**
 * Modifie les informations du compte d'un utilisateur spécifique
 * @route PUT /users/:id/account
 * @group Users - Operations about user
 */
// PUT /api/users/:id/account : Modifier les informations du compte d'un utilisateur spécifique
router.put('/:id/account', authenticationJwt, validate(schemas.put, 'body'), controllerHandler(usersController.updateUserById.bind(usersController)));
/**
 * Supprime le compte d'un utilisateur spécifique
 * @route DELETE /users/:id/account
 * @group Users - Operations about user
 */
// DELETE /api/users/:id/account : Supprimer le compte d'un utilisateur spécifique
router.delete('/:id/account', authenticationJwt, controllerHandler(usersController.delete.bind(usersController)));
/**
 * Récupère les informations d'un utilisateur transporteur
 * @route GET /users/:id/carrier
 * @group Users - Operations about user
 * @returns {object} 200 - An object with "result"
 * @returns {Error}  default - Unexpected error
 */
// GET /api/users/:id/carrier : Récupérer les informations d'un utilisateur transporteur
router.get('/:id/carrier', authenticationJwt, controllerHandler(usersController.findCarrierByUserId.bind(usersController)));
/**
 * Modifie les informations d'un utilisateur transporteur
 * @route PUT /users/:id/carrier
 * @group Users - Operations about user
 */
// PUT /api/users/:id/carrier : Modifier les informations d'un utilisateur transporteur
router.put('/:id/carrier', authenticationJwt, validate(schemas.put, 'body'), controllerHandler(usersController.updateCarrierById.bind(usersController)));
/**
 * Supprime les informations d'un utilisateur transporteur
 * @route DELETE /users/:id/carrier
 * @group Users - Operations about user
 */
// DELETE /api/users/:id/carrier : Supprimer les informations d'un utilisateur transporteur
router.delete('/:id/carrier', authenticationJwt, controllerHandler(usersController.delete.bind(usersController)));

module.exports = router;
