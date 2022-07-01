require('dotenv');
const jwt = require('jsonwebtoken');

const { User } = require('../database/models');
const CustomError = require('../utils/CustomError');

const secret = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '10d',
  algorithm: 'HS256',
};

const checkCredencials = (email, password, getUser) => {
  if (!getUser) return false;
  if (email === getUser.email && password === getUser.password) return true;
  return false;
};

const login = async (email, password) => {
  const getUser = await User.findOne({ where: { email } });
  const validation = checkCredencials(email, password, getUser);
  
  if (!getUser || !validation) throw new CustomError(400, 'Invalid fields');
  const { id, displayName, email: userEmail, image } = getUser;

  const token = jwt.sign({ payload: {
    id,
    displayName,
    email: userEmail,
    image,
  } }, secret, jwtConfig);
  return { token };
};

module.exports = {
  login,
};