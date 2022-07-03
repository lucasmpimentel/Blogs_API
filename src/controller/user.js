const userService = require('../service/userService');

const addUser = async (req, res) => {
  const newUser = req.body;
  const result = await userService.addUser(newUser);
  res.status(201).json(result);
};

module.exports = {
  addUser,
};