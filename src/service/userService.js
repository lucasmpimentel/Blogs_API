require('dotenv');
const jwt = require('jsonwebtoken');

const { User } = require('../database/models');
const CustomError = require('../utils/CustomError');

const secret = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '10d',
  algorithm: 'HS256',
};

const addUser = async (newUser) => {
  const { email, displayName, image } = newUser;
  const findUser = await User.findOne({ where: { email } });
  if (findUser) throw new CustomError(409, 'User already registered');

  const { id } = await User.create({ ...newUser });

  if (id) {
    const token = jwt.sign({ payload: {
      id,
      displayName,
      email,
      image,
    } }, secret, jwtConfig);
    return { token };
  }
  throw new CustomError(500, 'Internal server error');
};

const getAllUsers = async () => {
  const users = await User.findAll();
  const result = users.map(({ id, displayName, email, image }) => ({
    id,
    displayName,
    email,
    image,
  }));
  return result;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id);
  if (user) {
    const { email, displayName, image } = user;
    return { id: Number(id), displayName, email, image };
  }
  throw new CustomError(404, 'User does not exist');
};

module.exports = {
  addUser,
  getAllUsers,
  getUserById,
};
