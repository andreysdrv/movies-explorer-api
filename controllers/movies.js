const Movie = require('../models/user')

const getMovies = (req, res, next) => {
  Card.find({})
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const { country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieI } = req.body;
  const owner = req.movie._id;

  Card.create({ country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieI, owner })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      // if (err.name === 'ValidationError') {
      //   throw new BadRequest(err.message);
      // }
    })
    .catch(next);
};

const removeMovie = (req, res, next) => {
  const movieId = req.movie._id;
  const { _id } = req.params;

  Card.findById(_id)
    .orFail()
    .catch(() => {
      // throw new NotFound('Карточка с таким id не найдена');
    })
    .then((movie) => {
      if (movie.owner.toString() === movieId) {
        Card.findByIdAndRemove(_id)
          .then((movieData) => res.send(movieData));
      } else {
        // throw new Forbidden('Недостаточно прав!');
      }
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  removeMovie
}