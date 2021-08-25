const { Router } = require('express')
const moviesRouter = require('./movies')
const usersRouter = require('./users')
const auth = require('../middlewares/auth')
const { userCreate, userAuth, userLogout } = require('../controllers/users')

const router = Router()

// реализовать авторизацию, регистрацию, выход
router.post('/signup', userCreate)
router.post('/signin', userAuth)
router.post('/signout', userLogout)

router.use('/movies', auth, moviesRouter)
router.use('/users', auth, usersRouter)

router.use('*', () => {
  // throw new NotFound('Запрашиваемый ресурс не найден');
});

module.exports = router