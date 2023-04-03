const deliveryController = require('./deliveryController');
const userController = require('./usersController');

const apiController = {
  /**
   * responds with api documentation url
   *
   * @param {Object} request
   * @param {Object} response
   */
  getHome(request, response) {
    const fullURL = `${request.protocol}://${request.get('host')}${process.env.API_DOCUMENTATION_ROUTE ?? '/api-docs'}`;
    response.json({ documentation_url: fullURL });
  },
};

module.exports = { apiController, deliveryController, userController };
