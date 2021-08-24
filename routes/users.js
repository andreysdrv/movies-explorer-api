const { Router } = require('express')
const { getCurrentUser, updateUser } = require('../controllers/users')

const usersRouter = Router()

usersRouter.get('/users/me', getCurrentUser)
usersRouter.patch('/users/me', updateUser)

module.exports = usersRouter