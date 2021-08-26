const { Router } = require('express');
const { getCurrentUser, updateUser } = require('../controllers/users');
const { idValidation, userUpdateValidation } = require('../middlewares/validate');

const usersRouter = Router();

usersRouter.get('/me', idValidation, getCurrentUser);
usersRouter.patch('/me', userUpdateValidation, updateUser);

module.exports = usersRouter;
