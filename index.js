require('dotenv').config();
const bodyParser = require('body-parser');

const path = require('path');
const express = require('express');
const router = require('./app/routers');

const port = process.env.PORT || 3000;

const app = express();

// Configure body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/* app.use(upload.array()); */

app.use(router);

app.listen(port, () => {
  console.log(`Server ready: http://localhost:${port}`);
});
