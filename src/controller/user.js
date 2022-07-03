const userService = require('../service/userService');

const addUser = async (req, res) => {
  const newUser = req.body;
  const result = await userService.addUser(newUser);
  res.status(201).json(result);
};

const getAllUsers = async (_req, res) => {
  const result = await userService.getAllUsers();
  res.status(200).json(result);
};

module.exports = {
  addUser,
  getAllUsers,
};