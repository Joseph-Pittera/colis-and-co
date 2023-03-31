const debug = require('debug')('oblog:validate');
const BadInputError = require('../errors/BadInputError');

function validate(schema, dataSource) {
  debug('create a new validation middleware');
  return async (request, response, next) => {
    try {
      debug(schema.constructor.name);
      await schema.validateAsync(request[dataSource]);
      next();
    } catch (err) {
      next(new BadInputError(err));
    }
  };
}

module.exports = validate;
