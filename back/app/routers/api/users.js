const express = require('express');
const { usersController } = require('../../controllers/api');
const controllerHandler = require('../../controllers/helpers/controllerHandler');
const schemas = require('../../validations/schemas/users.schema');
const validate = require('../../validations/validate');
const userAuth = require('../../validations/schemas/userAuth.schema');
const authenticationJwt = require('../../middlewares/authJwt');
// Create an instance of an Express router
const router = express.Router();
/**
 * a user type
 *
 * @typedef {object} User
 * @property {number} id - user id
 * @property {email} email - user's email
 * @property {string} password - user's password
 * @property {string} first_name - user's first_name
 * @property {string} last_name - user's last_name
 * @property {string} address - user's address
 * @property {string} comp_address - user's comp_address
 * @property {number} zipcode - user's zipcode
 * @property {string} city - user's city
 * @property {string} birth_date - user's birth_date
 * @property {string} phone_number - user's phone_number
 * @property {boolean} carrier - when user is carrier
 * @property {boolean} identity_verified - user's identity_verified
 * @property {string} role - user's role
 * @property {string} created_at - date of creation
 * @property {string} updated_at - date of last update
 */

/**
 * Define a GET route for all users
 * @route GET /users
 * @group Users - Operations about user
 * @returns {object} 200 - An object with "result"
 * @returns {Error}  default - Unexpected error
 */
router.get('/', controllerHandler(usersController.findAll.bind(usersController)));

/**
 * Define a POST route for user's login
 * @route POST /users/login
 * @group Users - Operations about user
 * @param {string} email.query.required - email
 * @param {string} password.query.required - user's password
 * @returns {object} 200 - An object with "result"
 * @returns {Error}  401
 */
router.post('/login', validate(userAuth.post, 'body'), controllerHandler(usersController.loginAction.bind(usersController)));

/**
 * Define a POST route to create a new user
 * @route POST /users/signin
 * @group Users - Operations about user
 * @param {string} email.query.required - email
 * @param {string} password.query.required - user's password
 * @param {string} firstname.query.required - user's firstname
 * @param {string} lastname.query.required - user's lastname
 * @param {string} address.query.required - user's address
 * @param {string} comp_address - user's comp_address
 * @param {number} zipcode.query.required - user's zipcode
 * @param {number} city.query.required - city - user's city
 * @param {Date} birthdate.query - user's birthdate
 * @param {string} phonenumber.query.required - user's phonenumber
 * @returns {object} 200 - An object
 * @returns {Error}  500 - Internal server error
 */
router.post('/register', validate(schemas.post, 'body'), controllerHandler(usersController.createSecureUser.bind(usersController)));

/**
 * Define a GET route for one user
 * @route GET /users/:id
 * @group Users - Operations about user
 * @returns {object} 204 - An object with "result"
 */
router.get('/:id', authenticationJwt, controllerHandler(usersController.findByPk.bind(usersController)));

/**
 * Define a GET route for one user's account
 * @route GET /users/:id/account
 * @group Users - Operations about user
 * @returns {object} An object
 */
router.get('/:id/account', authenticationJwt, controllerHandler(usersController.findAccountByUserId.bind(usersController)));

/**
 * Define a PUT route to update one user's account
 * @route PUT /users/:id/account
 * @group Users - Operations about user
 * @returns {object} An object
 */
router.put('/:id/account', authenticationJwt, validate(schemas.put, 'body'), controllerHandler(usersController.updateUserById.bind(usersController)));

/**
 * Define a DELETE route to suppress one user's account
 * @route DELETE /users/:id/account
 * @group Users - Operations about user
 * @returns {Response} 204
 */
router.delete('/:id/account', authenticationJwt, controllerHandler(usersController.delete.bind(usersController)));

/**
 * Define a GET route for one carrier's account
 * @route GET /users/:id/carrier
 * @group Users - Operations about user
 * @returns {object} 200 - An object
 * @returns {Error} 404
 */
router.get('/:id/carrier', authenticationJwt, controllerHandler(usersController.findCarrierByUserId.bind(usersController)));

/**
 * Define a PUT route to update one carrier's account
 * @route PUT /users/:id/carrier
 * @group Users - Operations about user
 * @returns {object} 200 - An object
 * @returns {Error} 404
 */
router.put('/:id/carrier', authenticationJwt, validate(schemas.put, 'body'), controllerHandler(usersController.updateCarrierById.bind(usersController)));

/**
 * Define a DELETE route to suppress one carrier's account
 * @route DELETE /users/:id/carrier
 * @group Users - Operations about user
 * @returns {Response} 204
 */
router.delete('/:id/carrier', authenticationJwt, controllerHandler(usersController.delete.bind(usersController)));

module.exports = router;
