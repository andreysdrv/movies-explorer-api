const { Router } = require('express')
const moviesRouter = require('./movies')
const usersRouter = require('./users')

const router = Router()

router.use('/movies', moviesRouter)
router.use('/users', usersRouter)

module.exports = router