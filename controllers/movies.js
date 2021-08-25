const Movie = require('../models/movie')
const NotFound = require('../errors/NotFound')
const Forbidden = require('../errors/Forbidden')
const { NOT_FOUND, FORBIDDEN } = require('../errors/errors')

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const { country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieI } = req.body;
  const owner = req.movie._id;

  Movie.create({ country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieI, owner })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequest(err.message);
      }
    })
    .catch(next);
};

const removeMovie = (req, res, next) => {
  const movieId = req.movie._id;
  const { _id } = req.params;

  Movie.findById(_id)
    .orFail()
    .catch(() => {
      throw new NotFound(NOT_FOUND);
    })
    .then((movie) => {
      if (movie.owner.toString() === movieId) {
        Movie.findByIdAndRemove(_id)
          .then((movieData) => res.send(movieData));
      } else {
        throw new Forbidden(FORBIDDEN);
      }
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  removeMovie
}