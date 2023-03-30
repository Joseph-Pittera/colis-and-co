const express = require('express');
const websiteController = require('../../controllers/website');
const websiteErrorHandler = require('../../errors/helpers/websiteErrorHandler');
const NoResourceFoundError = require('../../errors/NoResourceFoundError');

const router = express.Router();

router.get('/', websiteController.getHome);

router.use((_, res, next) => {
  next(new NoResourceFoundError());
});

router.use(websiteErrorHandler);

module.exports = router;
