// On importe bcrypt
const bcrypt = require('bcrypt');
const CoreController = require('./coreController');

const usersController = {

  async loginAction(req, res) {
    // on destructure l'objet body afin de transformer chaque propriété utile en variable simple
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400), { error: 'Champs obligatoire' };
    }
    const user = await .getOne({
      where: {
        email,
      },
    });
  },
};

module.exports = usersController;
