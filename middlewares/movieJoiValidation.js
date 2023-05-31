const { celebrate, Joi } = require('celebrate');

// проверка url картинки через регулярное выражение:
const regex = /(ftp|http|https):\/\/.(www\.)?[a-z\-\d]+\.[\w\-.~:/?#[\]@!$&'()*+,;=]{1,}#?/i;

// проверка полей при создании карточки
module.exports.createSavedMovieJoiValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(regex),
    trailerLink: Joi.string().required().regex(regex),
    thumbnail: Joi.string().required().regex(regex),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

// проверка _id при удалении карточки, установке или снятии лайка
module.exports.movieIdJoiValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
});
