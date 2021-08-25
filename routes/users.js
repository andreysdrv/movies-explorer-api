const { Router } = require('express');
const { getCurrentUser, updateUser } = require('../controllers/users');
const { idValidation, userValidation } = require('../middlewares/validate');

const usersRouter = Router();

usersRouter.get('/me', idValidation, getCurrentUser);
usersRouter.patch('/me', userValidation, updateUser);

module.exports = usersRouter;
