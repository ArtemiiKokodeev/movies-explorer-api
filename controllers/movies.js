const Movie = require('../models/movie');
const DataNotFoundError = require('../errors/DataNotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const { OK, CREATED } = require('../utils/constants');

// GET /movies — возвращает все сохраненные ("созданные") фильмы
module.exports.getSavedMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .populate('owner')
    .then((movies) => res.status(OK).send(movies.reverse()))
    .catch(next);
};

// POST /movies — сохраняет ("создает") фильм
module.exports.createSavedMovie = (req, res, next) => {
  const data = req.body;
  Movie.create({
    country: data.country,
    director: data.director,
    duration: data.duration,
    year: data.year,
    description: data.description,
    image: data.image,
    trailerLink: data.trailerLink,
    nameRU: data.nameRU,
    nameEN: data.nameEN,
    thumbnail: data.thumbnail,
    movieId: data.movieId,
    owner: req.user._id,
  })
    .then((movie) => res.status(CREATED).send({ movie }))
    .catch(next);
};

// DELETE /movies/:movieId — убирает фильм из сохраненных ("удаляет") по идентификатору
module.exports.removeSavedMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new DataNotFoundError('Запрашиваемая карточка не найдена');
    })
    .then((movie) => {
      const owner = movie.owner.toString();
      // console.log(owner);
      if (req.user._id !== owner) {
        throw new ForbiddenError('Нет доступа к удалению карточки');
      }
      Movie.deleteOne(movie)
        .then(() => res.status(OK).send(movie))
        .catch(next);
    })
    .catch(next);
};
