const deliveryController = require('./deliveryController');
const usersController = require('./usersController');

const apiController = {
  /**
   * Get the API documentation URL
   * @function getHome
   * @param {Object} request - The HTTP request object
   * @param {Object} response - The HTTP response object
   * @returns {Object} Returns a JSON object containing the API documentation URL
   */
  getHome(request, response) {
    const fullURL = `${request.protocol}://${request.get('host')}${process.env.API_DOCUMENTATION_ROUTE ?? '/api-docs'}`;
    response.json({ documentation_url: fullURL });
  },
};

module.exports = {
  apiController, deliveryController, usersController,
};
