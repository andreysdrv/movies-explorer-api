const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const customValidate = (url) => {
  const result = validator.isURL(url);
  if (!result) {
    throw new Error('URL is not valid');
  }
  return url;
};

const idValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24).hex(),
  }),
});

const movieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(customValidate),
    trailer: Joi.string().required().custom(customValidate),
    thumbnail: Joi.string().required().custom(customValidate),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const userValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const userAuthValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports = {
  idValidation,
  movieValidation,
  userValidation,
  userAuthValidation,
};
