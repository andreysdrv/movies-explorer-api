const jwt = require('jsonwebtoken');

const { CURRENT_JWT_SECRET } = require('../configs/index');
const { AUTH } = require('../errors/errors');
const UnauthorizedError = require('../errors/UnauthorizedError');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, CURRENT_JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError(AUTH);
  }
  req.user = payload;

  next();
};

module.exports = auth;
