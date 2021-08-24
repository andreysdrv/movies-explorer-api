const { Schema, model } = require('mongoose');
const { linkRegExp } = require('../middlewares/validate')

const movieSchema = new Schema({
  country: {
    type: String,
    require: true
  },
  director: {
    type: String,
    require: true
  },
  duration: {
    type: Number,
    require: true
  },
  year: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  image: {
    type: String,
    require: true,
    validate: {
      validator(link) {
        return linkRegExp.test(link)
      }
    }
  },
  trailer: {
    type: String,
    require: true,
    validate: {
      validator(link) {
        return linkRegExp.test(link)
      }
    }
  },
  thumbnail: {
    type: String,
    require: true,
    validate: {
      validator(link) {
        return linkRegExp.test(link)
      }
    }
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Schema.Types.ObjectId,
    ref: 'movie',
    required: true,
  },
  nameRU: {
    type: String,
    require: true
  },
  nameEN: {
    type: String,
    require: true
  }
})

module.exports = model('movie', movieSchema)