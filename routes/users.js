const { Router } = require('express')
const { getCurrentUser, updateUser } = require('../controllers/users')
const { idValidation, userValidation } = require('../middlewares/validate')

const usersRouter = Router()

usersRouter.get('/users/me', idValidation, getCurrentUser)
usersRouter.patch('/users/me', userValidation, updateUser)

module.exports = usersRouter