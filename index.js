require('dotenv').config();
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const express = require('express');
const router = require('./app/routers');

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

app.use(router);

app.listen(port, () => {
  console.log(`Server ready: http://localhost:${port}`);
});
