require('dotenv').config();
const debug = require('debug')('colis:index');
const bodyParser = require('body-parser');

const cors = require('cors');

const express = require('express');

const router = require('./app/routers');

// Import custom error classes
const { BadInputError } = require('./app/errors/BadInputError');

const port = process.env.PORT || 3000;

const app = express();

/** *********** */
/*  Swagger   */
/** *********** */
const expressSwagger = require('express-swagger-generator')(app);

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

    },
  },
  basedir: __dirname, // app absolute path
  files: ['./app/routers/api/users.js'], // Path to the API handle folder
});

app.use(cors());

// Configure body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

// Add error handling middleware
app.use((err, req, res, next) => {
  // If the error is a bad input error, send a 400 status code and the error message
  if (err instanceof BadInputError) {
    res.status(400).json({ message: err.message });
  } else {
    // Otherwise, log the error and send a 500 status code
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
  next();
});

// Start the server and listen for incoming requests
app.listen(port, () => {
  debug(`Server ready: http://localhost:${port}`);
});
