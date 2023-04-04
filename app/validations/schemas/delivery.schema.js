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
    city: Joi.string().required(),
    arrival_address: Joi.string().required(),
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
    city: Joi.string().required(),
    arrival_address: Joi.string(),
    departure_date: Joi.date(),
    arrival_date: Joi.date(),
    price: Joi.number().positive(),
    creator_id: Joi.number().integer().positive(),
    carrier_id: Joi.number().integer().positive(),
  }).min(1),
};

module.exports = schemas;
