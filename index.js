require('dotenv').config();
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
// Import multer middleware for file handling
const multer = require('multer');


// Initialize multer instance
const upload = multer();

// Import path and express modules
const path = require('path');
const express = require('express');

const router = require('./app/routers');

// Import custom error classes
const { BadInputError } = require('./app/errors/BadInputError');

const port = process.env.PORT || 3000;

const app = express();
const expressJSDocSwagger = require('express-jsdoc-swagger');

// Configure body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/* app.use(upload.array()); */

app.use(cors());

// Configuration de session
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
}));

// Use the multer middleware to handle file uploads

// Configure body-parser middleware
 app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
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
});

// Start the server and listen for incoming requests
app.listen(port, () => {
  console.log(`Server ready: http://localhost:${port}`);
});
