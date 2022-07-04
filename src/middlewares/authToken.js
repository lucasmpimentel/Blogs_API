require('dotenv');
const jwt = require('jsonwebtoken');
const CustomError = require('../utils/CustomError');

const secret = process.env.JWT_SECRET;

const authToken = async (req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) throw new CustomError(401, 'Token not found');

  jwt.verify(token, secret, (err, decoded) => {
    if (err) throw new CustomError(401, 'Expired or invalid token');
    req.user = decoded.payload;
  });

  next();
};

module.exports = authToken;
