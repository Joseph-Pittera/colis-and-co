require('dotenv').config();
const path = require('path');
const debug = require('debug')('colis:index');
const bodyParser = require('body-parser');

const cors = require('cors');

const express = require('express');

const app = express();

const expressSwagger = require('express-swagger-generator')(app);

const router = require('./app/routers');

const port = process.env.PORT || 3000;

/**

Generates and adds Swagger documentation to the Express.js app
@function expressSwagger
@param {Object} options - Options for the Swagger documentation generation
@param {string} options.basedir - The absolute path of the app
@param {Array} options.files - The path(s) to the API handle folder(s)
@param {swaggerDefinition} options.swaggerDefinition - The Swagger definition for the API
*/
expressSwagger({
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
  basedir: __dirname, // app absolute path
  files: ['./app/*/*/*.js'], // Path to the API handle folder
});

app.use(cors());

// Configure body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define route to show delivery images
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(router);

// Start the server and listen for incoming requests
app.listen(port, () => {
  debug(`Server ready: http://localhost:${port}`);
});
