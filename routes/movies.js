const router = require('express').Router();
const {
  createSavedMovie, getSavedMovies, removeSavedMovie,
} = require('../controllers/movies');
const {
  createSavedMovieJoiValidation, movieIdJoiValidation,
} = require('../middlewares/movieJoiValidation');

router.post('/', createSavedMovieJoiValidation, createSavedMovie);
router.get('/', getSavedMovies);
router.delete('/:movieId', movieIdJoiValidation, removeSavedMovie);

module.exports = router;
