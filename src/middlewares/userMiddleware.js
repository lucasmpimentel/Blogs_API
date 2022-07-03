const joi = require('joi');
const CustomError = require('../utils/CustomError');
const { User } = require('../database/models');

const addUserSchema = joi.object({
  displayName: joi.string().min(8).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  image: joi.string(),
});

const addUser = async (req, _res, next) => {
  const { displayName, email, password, image } = req.body;
  const { error } = addUserSchema.validate({
    displayName,
    email,
    password,
    image,
  });

  if (error) {
    error.status = 400;
    throw new CustomError(error.status, error.message);
  }

  const duplicate = await User.findOne({ where: { email } });
  if (!error && duplicate) throw new CustomError(409, 'User already registered');

  next();
};

module.exports = {
  addUser,
};
