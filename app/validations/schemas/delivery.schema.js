const Joi = require('joi');

const schemas = {
  post: Joi.object({
    type_of_marchandise: Joi.string().required(),
    quantity: Joi.number().integer().min(1).required(),
    volume: Joi.number().integer().min(1).required(),
    length: Joi.number().integer().min(1).required(),
    width: Joi.number().integer().min(1).required(),
    height: Joi.number().integer().min(1).required(),
    departure_address: Joi.string().required(),
    zipcode: Joi.string().pattern(/^0[1-9]\d{3}$|^20[1-2]\d{2}$|^20300$|^[13-8]\d{4}$|^9[0-6]\d{3}$|^97[1-6]\d{2}$|^98[4678]\d{2}$|^9{5}$/).required(),
    city: Joi.string().required(),
    arrival_address: Joi.string().required(),
    arrival_zipcode: Joi.string().pattern(/^0[1-9]\d{3}$|^20[1-2]\d{2}$|^20300$|^[13-8]\d{4}$|^9[0-6]\d{3}$|^97[1-6]\d{2}$|^98[4678]\d{2}$|^9{5}$/).required(),
    arrival_city: Joi.string().required(),
    departure_date: Joi.date().required(),
    arrival_date: Joi.date().required(),
    price: Joi.number().positive().required(),
    creator_id: Joi.number().integer().positive(),
    carrier_id: Joi.number().integer().positive(),
  }).required(),
  patch: Joi.object({
    type_of_marchandise: Joi.string(),
    quantity: Joi.number().integer().min(1),
    volume: Joi.number().integer().min(1),
    length: Joi.number().integer().min(1),
    width: Joi.number().integer().min(1),
    height: Joi.number().integer().min(1),
    departure_address: Joi.string(),
    zipcode: Joi.string().pattern(/^0[1-9]\d{3}$|^20[1-2]\d{2}$|^20300$|^[13-8]\d{4}$|^9[0-6]\d{3}$|^97[1-6]\d{2}$|^98[4678]\d{2}$|^9{5}$/),
    city: Joi.string(),
    arrival_address: Joi.string(),
    arrival_zipcode: Joi.string().pattern(/^0[1-9]\d{3}$|^20[1-2]\d{2}$|^20300$|^[13-8]\d{4}$|^9[0-6]\d{3}$|^97[1-6]\d{2}$|^98[4678]\d{2}$|^9{5}$/),
    arrival_city: Joi.string(),
    departure_date: Joi.date(),
    arrival_date: Joi.date(),
    price: Joi.number().positive(),
    creator_id: Joi.number().integer().positive(),
    carrier_id: Joi.number().integer().positive(),
  }).min(1),
};

module.exports = schemas;
