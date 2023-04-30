const userController = require('../app/controllers/api/usersController');

describe('createSecureUser', () => {
  it('should create a new user', async () => {
    const req = {
      json: jest.fn(() => ({
        email: 'test@test.com',
        password: 'newpassword',
        firstName: 'John',
        lastName: 'Doe',
        address: '123 hello',
        zipcode: '12345',
        city: 'newCity',
        phoneNumber: '0606060606',
        carrier: false,
        identityVerified: false,
        role: 'user'
      }))
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    await userController.createSecureUser(req, res);
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ message: 'Email déjà utilisé' });
  });
});
