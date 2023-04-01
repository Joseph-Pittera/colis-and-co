const deliveryController = require('./deliveryController');
const usersController = require('./usersController');
const accountController = require('./accountController');
const adminController = require('./adminController');

const apiController = {

  getHome(request, response) {
    const fullURL = `${request.protocol}://${request.get('host')}${process.env.API_DOCUMENTATION_ROUTE ?? '/api-docs'}`;
    response.json({ documentation_url: fullURL });
  },
};

module.exports = {
  apiController, deliveryController, usersController, accountController, adminController,
};
