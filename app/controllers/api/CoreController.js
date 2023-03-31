const debug = require('debug')('colis:controllers');

/** Class representing an abstract core controller. */
class CoreController {
  static dataMapper;

  async getAll(_, response) {
    debug(`${this.constructor.name} getAll`);
    const results = await this.constructor.dataMapper.findAll();
    response.json(results);
  }

  async getOne(request, response) {
    debug(`${this.constructor.name} getOne`);
    const { id } = request.params;
    const results = await this.constructor.dataMapper.findByPk(id);
    if (results) {
      return response.json(results);
    }
    return response.status(204).send();
  }

  async create(request, response) {
    debug(`${this.constructor.name} create`);
    const results = await this.constructor.dataMapper.create(request.body);
    response.json(results);
  }

  async modify(request, response) {
    debug(`${this.constructor.name} modify`);
    const { id } = request.params;
    const results = await this.constructor.dataMapper.modify(id, request.body);
    response.json(results);
  }

  async delete(request, response) {
    debug(`${this.constructor.name} delete`);
    const { id } = request.params;
    await this.constructor.dataMapper.delete(id);
    return response.status(204).send();
  }
}

module.exports = CoreController;
