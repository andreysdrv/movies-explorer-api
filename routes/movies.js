const { Router } = require('express')
const { getMovies, createMovie, removeMovie } = require('../controllers/movies')
const { idValidation, movieValidation } = require('../middlewares/validate')

const moviesRouter = Router()

moviesRouter.get('/movies', getMovies)
moviesRouter.post('/movies', movieValidation, createMovie)
moviesRouter.delete('/movies/:_id', idValidation, removeMovie)

module.exports = moviesRouter