const { Router } = require('express')

const moviesRouter = Router()

moviesRouter.get('/movies')
moviesRouter.post('/movies')
moviesRouter.delete('/movies/:_id')

module.exports = moviesRouter