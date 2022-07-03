const categoriesService = require('../service/categoriesService');

const addCategory = async (req, res) => {
  const { name } = req.body;
  const result = await categoriesService.addCategory(name);
  res.status(201).json(result);
};

module.exports = {
  addCategory,
};
