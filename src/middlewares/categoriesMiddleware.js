const joi = require('joi');
const CustomError = require('../utils/CustomError');
const { Category } = require('../database/models');

const categorieSchema = joi.object({
  name: joi.string().required(),
});

const categorieValidation = async (req, _res, next) => {
  const { name } = req.body;
  
  const { error } = categorieSchema.validate({ name });
  if (error) throw new CustomError(400, error.message);

  const result = await Category.findOne({ where: { name } });
  if (result) throw new CustomError(409, 'Already registered');

  next();
};

module.exports = categorieValidation;
