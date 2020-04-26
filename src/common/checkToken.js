const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('./config');
const createError = require('http-errors');

const checkToken = (req, res, next) => {
  let token = req.headers.authorization;

  if (token) {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }

    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        throw createError(401, 'Token is not valid');
      }

      req.decoded = decoded;
      next();
    });
  } else {
    throw createError(401, 'Auth token is missing');
  }
};

module.exports = checkToken;
