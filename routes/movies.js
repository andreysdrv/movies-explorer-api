const { Router } = require('express')
const { getMovies, createMovie, removeMovie } = require('../controllers/movies')

const moviesRouter = Router()

moviesRouter.get('/movies', getMovies)
moviesRouter.post('/movies', createMovie)
moviesRouter.delete('/movies/:_id', removeMovie)

module.exports = moviesRouter