const express = require('express');
const usersRouter = require('./users');
const deliveryRouter = require('./delivery');
const { apiController } = require('../../controllers/api');
const NoResourceFoundError = require('../../errors/NoResourceFoundError');
const apiErrorHandler = require('../../errors/helpers/apiErrorHandler');
// const usersAccountRouter = require('./usersAccount');
// const usersCarrierRouter = require('./usersCarrier');
// const usersPaymentRouter = require('./usersPayment');

const router = express.Router();

router.all('/', apiController.getHome);

router.use('/delivery', deliveryRouter);
router.use('/users', usersRouter);
// router.use('/usersAccount', usersAccountRouter);

router.use((_, res, next) => {
  next(new NoResourceFoundError());
});

router.use(apiErrorHandler);

module.exports = router;
