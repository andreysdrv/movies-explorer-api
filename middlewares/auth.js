const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const { AUTH } = require('../errors/errors')
const AuUnauthorizedErrorth = require('../errors/UnauthorizedError')

// создать файл с ошибками
// const Auth = require('../errors/Auth');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError(AUTH);
  }
  req.user = payload;

  next();
};

module.exports = auth;