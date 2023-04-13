const expressSwagger = require('express-swagger-generator');
const path = require('path');

function setupSwagger(app) {
  const swaggerOptions = {
    swaggerDefinition: {
      info: {
        description: 'Livraison de colis entre particuliers',
        title: 'Colis&co Swagger',
        version: '1.0.0',
      },
      host: 'localhost:3000',
      basePath: '/api',
      produces: [
        'application/json',
      ],
      schemes: ['http'],
      securityDefinitions: {
        JWT: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: 'JWT',
        },
      },
    },
    basedir: path.join(__dirname, '..'), // app absolute path
    files: ['./routers/api/*.js'], // Path to the API handle folder
  };

  expressSwagger(app)(swaggerOptions);
}

module.exports = setupSwagger;
