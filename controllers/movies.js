const Movie = require('../models/movie');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');
const BadRequest = require('../errors/BadRequest');
const { NOT_FOUND, FORBIDDEN } = require('../utils/constants');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send({ movies }))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.send({ movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequest(err.message);
      }
      throw err;
    })
    .catch(next);
};

const removeMovie = (req, res, next) => {
  const ownerId = req.user._id;
  const { _id } = req.params;

  Movie.findById(_id)
    .orFail()
    .catch(() => {
      throw new NotFound(NOT_FOUND);
    })
    .then((movie) => {
      if (movie.owner.toString() === ownerId) {
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
  removeMovie,
};
