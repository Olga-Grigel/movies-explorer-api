const Movie = require('../models/movie');
const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-error');
const CastError = require('../errors/cast-error');

const getMovies = (request, response, next) => {
  Movie
    .find({})
    .then((movies) => response.status(200).send(movies))
    .catch((err) => {
      next(err);
    });
};

const createMovie = (request, response, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = request.body;
  const owner = request.user._id;
  return Movie
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner,
    })
    .then((movie) => response.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new CastError('Переданы некорректные данные при создании фильма'));
      } else {
        next(err);
      }
    });
};

// const likeCard = (request, response, next) => {
//   Card
//     .findByIdAndUpdate(
//       request.params.cardId,
//       { $addToSet: { likes: request.user._id } }, // добавить _id в массив, если его там нет
//       { new: true },
//     )
//     .orFail(new NotFoundError('Нет карточки по заданному ID'))
//     .then((card) => response.status(201).send(card))
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         next(new CastError('Передан некорректный ID карточки'));
//       } else {
//         next(err);
//       }
//     });
// };

// const dislikeCard = (request, response, next) => {
//   Card
//     .findByIdAndUpdate(
//       request.params.cardId,
//       { $pull: { likes: request.user._id } }, // убрать _id из массива
//       { new: true },
//     )
//     .orFail(new NotFoundError('Нет карточки по заданному ID'))
//     .then((card) => response.status(201).send(card))
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         next(new CastError('Передан некорректный ID карточки'));
//       } else {
//         next(err);
//       }
//     });
// };

const deleteMovie = (request, response, next) => {
  const { _id } = request.params;
  return Movie
    .findById(_id)
    .orFail(new NotFoundError('Нет фильма по заданному ID'))
    .then((movie) => {
      if (!movie.owner.equals(request.user._id)) {
        return next(new ForbiddenError('Нельзя удалить чужoй фильм'));// потом убрать!!!!!
      }
      return movie.remove()
        .then(() => response.send({ message: 'Фильм удалён' }));
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
