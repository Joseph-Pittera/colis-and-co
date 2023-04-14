const express = require('express');
const apiRouter = require('./api');
const websiteRouter = require('./website');

const router = express.Router();

// Utilisation des routes pour l'API et swagger
router.use('/api', apiRouter);
router.use('/', websiteRouter);

module.exports = router;
