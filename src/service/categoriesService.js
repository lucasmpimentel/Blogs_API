const CustomError = require('../utils/CustomError');
const { Category } = require('../database/models');

const addCategory = async (name) => {
  const newCategory = await Category.create({ name });
  if (!newCategory) throw new CustomError(500, 'Internal server error');
  return newCategory;
};

module.exports = {
  addCategory,
};