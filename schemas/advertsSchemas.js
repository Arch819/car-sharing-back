const Joi = require("joi");

const addressSchema = {
  street: Joi.string()
    .required()
    .messages({ "any.required": "missing required street field" }),
  city: Joi.string()
    .required()
    .messages({ "any.required": "missing required city field" }),
  country: Joi.string()
    .required()
    .messages({ "any.required": "missing required country field" }),
};

const rentalConditionsSchema = {
  minimumAge: Joi.number()
    .required()
    .messages({ "any.required": "missing required MinimumAge field" }),
  driverLicense: Joi.boolean()
    .required()
    .messages({ "any.required": "missing required driverLicense field" }),
  otherRequirements: Joi.string(),
};

const createAdvertSchema = Joi.object({
  year: Joi.string()
    .required()
    .messages({ "any.required": "missing required year field" }),
  make: Joi.string()
    .required()
    .messages({ "any.required": "missing required make field" }),
  model: Joi.string()
    .required()
    .messages({ "any.required": "missing required model field" }),
  type: Joi.string()
    .required()
    .messages({ "any.required": "missing required type field" }),
  // img: Joi.string()
  //   .required()
  //   .messages({ "any.required": "missing required img field" }),
  description: Joi.string()
    .required()
    .messages({ "any.required": "missing required description field" }),
  fuelConsumption: Joi.string()
    .required()
    .messages({ "any.required": "missing required fuelConsumption field" }),
  engineSize: Joi.string()
    .required()
    .messages({ "any.required": "missing required engineSize field" }),
  accessories: Joi.array(),
  functionalities: Joi.array(),
  rentalPrice: Joi.number()
    .required()
    .messages({ "any.required": "missing required rentalPrice field" }),
  rentalCompany: Joi.string()
    .required()
    .messages({ "any.required": "missing required rentalCompany field" }),
  address: Joi.object(addressSchema).required(),
  rentalConditions: Joi.object(rentalConditionsSchema).required(),
  mileage: Joi.number()
    .required()
    .messages({ "any.required": "missing required mileage field" }),
});

module.exports = {
  createAdvertSchema,
};
