const { Router } = require('express');
const { getMovies, createMovie, removeMovie } = require('../controllers/movies');
const { idValidation, movieValidation } = require('../middlewares/validate');

const moviesRouter = Router();

moviesRouter.get('/', getMovies);
moviesRouter.post('/', movieValidation, createMovie);
moviesRouter.delete('/:_id', idValidation, removeMovie);

module.exports = moviesRouter;
