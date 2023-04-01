const debug = require('debug')('colis:controllers');
const CoreController = require('./CoreController');
const AdminDataMapper = require('../../models/adminDataMapper');

class AdminController extends CoreController {
  static dataMapper = AdminDataMapper;

  async getProfile(request, response) {
    debug(`${this.constructor.name} getProfile`);
    const { id } = request.params;
    const results = await this.constructor.dataMapper.findByPk(id);
    if (results) {
      return response.json(results);
    }
    return response.status(204).send();
  }

  async updateProfile(request, response) {
    debug(`${this.constructor.name} updateProfile`);
    const { id } = request.params;
    const results = await this.constructor.dataMapper.modify(id, request.body);
    response.json(results);
  }

  async getAllPayments(_, response) {
    debug(`${this.constructor.name} getAllPayments`);
    const results = await this.constructor.dataMapper.getAllPayments();
    response.json(results);
  }

  async getPayment(request, response) {
    debug(`${this.constructor.name} getPayment`);
    const { paymentId } = request.params;
    const results = await this.constructor.dataMapper.getPayment(paymentId);
    if (results) {
      return response.json(results);
    }
    return response.status(204).send();
  }

  async modifyPayment(request, response) {
    debug(`${this.constructor.name} modifyPayment`);
    const { paymentId } = request.params;
    const results = await this.constructor.dataMapper.modifyPayment(paymentId, request.body);
    response.json(results);
  }

  async deletePayment(request, response) {
    debug(`${this.constructor.name} deletePayment`);
    const { paymentId } = request.params;
    await this.constructor.dataMapper.deletePayment(paymentId);
    return response.status(204).send();
  }

  async getAllDeliveries(_, response) {
    debug(`${this.constructor.name} getAllDeliveries`);
    const results = await this.constructor.dataMapper.getAllDeliveries();
    response.json(results);
  }

  async addDelivery(request, response) {
    debug(`${this.constructor.name} addDelivery`);
    const results = await this.constructor.dataMapper.addDelivery(request.body);
    response.json(results);
  }

  async modifyDelivery(request, response) {
    debug(`${this.constructor.name} modifyDelivery`);
    const { deliveryId } = request.params;
    const results = await this.constructor.dataMapper.modifyDelivery(deliveryId, request.body);
    response.json(results);
  }

  async deleteDelivery(request, response) {
    debug(`${this.constructor.name} deleteDelivery`);
    const { deliveryId } = request.params;
    await this.constructor.dataMapper.deleteDelivery(deliveryId);
    return response.status(204).send();
  }

  async deleteDriver(request, response) {
    debug(`${this.constructor.name} deleteDriver`);
    const { driverId } = request.params;
    await this.constructor.dataMapper.deleteDriver(driverId);
    return response.status(204).send();
  }
}

module.exports = AdminController;
