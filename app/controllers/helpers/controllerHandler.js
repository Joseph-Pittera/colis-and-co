const debug = require('debug')('colis:controllers');

function controllerHandler(controller) {
  debug(`create new controller with error handling for ${controller.name}`);
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}
module.exports = controllerHandler;
