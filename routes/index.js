const { Router } = require('express');
const moviesRouter = require('./movies');
const usersRouter = require('./users');
const auth = require('../middlewares/auth');
const { userAuthValidation, userValidation } = require('../middlewares/validate');
const { userCreate, userAuth, userLogout } = require('../controllers/users');
const { NotFound } = require('../errors/NotFound');
const { NOT_FOUND } = require('../errors/errors');

const router = Router();

router.post('/signup', userValidation, userCreate);
router.post('/signin', userAuthValidation, userAuth);
router.post('/signout', userLogout);

router.use('/movies', auth, moviesRouter);
router.use('/users', auth, usersRouter);

router.use('*', () => {
  throw new NotFound(NOT_FOUND);
});

module.exports = router;
