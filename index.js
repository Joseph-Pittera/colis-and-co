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

app.use(cors());

// Configure body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

// Start the server and listen for incoming requests
app.listen(port, () => {
  debug(`Server ready: http://localhost:${port}`);
});
