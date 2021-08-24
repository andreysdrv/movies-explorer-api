const { Router } = require('express')
const moviesRouter = require('./movies')
const usersRouter = require('./users')
const auth = require('../middlewares/auth')

const router = Router()

// реализовать авторизацию и регистрацию
// router.post('/signup', userCreate)
// router.post('/signin', userAuth)

router.use('/movies', auth, moviesRouter)
router.use('/users', auth, usersRouter)

module.exports = router