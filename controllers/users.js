const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const ConflictRequest = require('../errors/ConflictRequest');
const { NOT_FOUND, CONFLICT } = require('../utils/constants');
const { CURRENT_JWT_SECRET } = require('../configs/index');
const { AUTH_SUCCES, LOGOUT_SUCCES } = require('../utils/constants');

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .catch(() => next(new NotFound(NOT_FOUND)))
    .then((currentUser) => res.send({ currentUser }))
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, email }, { new: true, runValidators: true })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequest(err.message);
      }
      throw err;
    })
    .catch(next);
};

const userCreate = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.send({
      user: {
        name: user.name, email: user.email,
      },
    }))
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        throw new ConflictRequest(CONFLICT);
      }
      throw err;
    })
    .catch(next);
};

const userAuth = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        CURRENT_JWT_SECRET,
        { expiresIn: '7d' },
      );

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      })
        .send({ message: AUTH_SUCCES });
    })
    .catch(next);
};

const userLogout = (req, res) => {
  res.clearCookie('jwt').send({ message: LOGOUT_SUCCES });
};

module.exports = {
  getCurrentUser,
  updateUser,
  userCreate,
  userAuth,
  userLogout,
};
