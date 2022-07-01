const joi = require('joi');
const CustomError = require('../utils/CustomError');

const loginSchema = joi
  .object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  });

const loginValidation = async (req, res, next) => {
  const { email, password } = req.body;
  const { error } = loginSchema.validate({
    email,
    password,
  });

  if (error) {
    error.status = 400;
    throw new CustomError(error.status, 'Some required fields are missing');
  }
  next();
};

module.exports = loginValidation;