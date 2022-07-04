const categoriesService = require('../service/categoryService');

const addCategory = async (req, res) => {
  const { name } = req.body;
  const result = await categoriesService.addCategory(name);
  res.status(201).json(result);
};

const getAll = async (_req, res) => {
  const result = await categoriesService.getAll();
  res.status(200).json(result);
};

module.exports = {
  addCategory,
  getAll,
};
