const joi = require('joi');
const CustomError = require('../utils/CustomError');
const categoryService = require('../service/categoryService');

const newPostSchema = joi.object({
  title: joi.string().required(),
  content: joi.string().required(),
  categoryIds: joi.array().min(1).required(),
}).messages({
  'any.required': 'Some required fields are missing',
  'string.empty': 'Some required fields are missing',
  'array.min': '"categoryIds" not found',
});

const newPostValidation = async (req, _res, next) => { 
  const { title, content, categoryIds } = req.body;
  const { error } = newPostSchema
    .validate({ title, content, categoryIds });
  if (error) throw new CustomError(400, error.message);

  const categories = await categoryService.getAll();
  const checkCategory = categories.filter((cat) => categoryIds.includes(cat.id));
  if (checkCategory.length !== categoryIds.length) {
    throw new CustomError(400, '"categoryIds" not found');
  }
  next();
};

module.exports = newPostValidation;