const debug = require('debug')('colis:controllers');
const CoreController = require('./CoreController');
const UserDataMapper = require('../../models/usersDataMapper');

/** Class representing a user controller. */
class UserController extends CoreController {
  static dataMapper = UserDataMapper;

  constructor() {
    super();
    console.log('userController created');
  }

  async getAllUsers(request, response) {
    console.log(`${this.constructor.name} getAllUsers`);
    const users = await this.constructor.dataMapper.findAll();
    response.json(users);
  }

  async createUser(request, response) {
    debug(`${this.constructor.name} createUser`);
    const newUser = request.body;
    const createdUser = await this.constructor.dataMapper.create(newUser);
    response.json(createdUser);
  }

  async updateUser(request, response) {
    debug(`${this.constructor.name} updateUser`);
    const userId = request.params.id;
    const updatedUserData = request.body;
    const updatedUser = await this.constructor.dataMapper.update(userId, updatedUserData);
    response.json(updatedUser);
  }

  async deleteUser(request, response) {
    debug(`${this.constructor.name} deleteUser`);
    const userId = request.params.id;
    await this.constructor.dataMapper.delete(userId);
    response.status(204).send();
  }
}

module.exports = new UserController();
