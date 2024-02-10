const Joi = require("joi");
const { emailRegexp } = require("../helpers");

const signInSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.pattern.base": "Invalid email format",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password should be at least {#limit} characters long",
    "any.required": "Password is required",
  }),
});

const signUpSchema = Joi.object({
  name: Joi.string().required(),
  // .messages({ "any.required": "Name is required" }),
  email: Joi.string().pattern(emailRegexp).required(),
  //   .messages({
  //   "string.pattern.base": "Invalid email format",
  //   "any.required": "Email is required",
  // })
  password: Joi.string().min(6).required(),
  //   .messages({
  //   "string.min": "Password should be at least {#limit} characters long",
  //   "any.required": "Password is required",
  // }),
}).messages({
  "any.required": "{#label} is required",
  "string.pattern.base": "Invalid email format",
  "string.min": "{#label} should be at least {#limit} characters long",
});

const profileSchema = Joi.object({
  name: Joi.string().messages({
    "string.empty": "Name cannot be empty",
  }),
  email: Joi.string().pattern(emailRegexp).messages({
    "string.pattern.base": "Invalid email format",
  }),
  avatar: Joi.string().allow(""),
});

const passwordSchema = Joi.string().min(6).required().messages({
  "string.min": "Password should be at least {#limit} characters long",
  "any.required": "Password is required",
});

module.exports = {
  signInSchema,
  signUpSchema,
  profileSchema,
  passwordSchema,
};
