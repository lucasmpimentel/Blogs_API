const loginService = require('../service/loginService');

const makeLogin = async (req, res) => {
  const { email, password } = req.body;
  const result = await loginService.login(email, password);
  res.status(200).json(result);
};

module.exports = {
  makeLogin,
};