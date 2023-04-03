require('dotenv').config();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

const path = require('path');
const express = require('express');
const router = require('./app/routers');
const { BadInputError } = require('./app/errors/BadInputError');

const port = process.env.PORT || 3000;

const app = express();

// Configure body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

app.use(router);

// Ajoutez le middleware pour gérer les erreurs ici
app.use((err, req, res, next) => {
  if (err instanceof BadInputError) {
    res.status(400).json({ message: err.message });
  } else {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server ready: http://localhost:${port}`);
});
