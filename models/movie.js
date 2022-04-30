const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator(image) { return validator.isURL(image); },
      },
    },
    trailerLink: {
      type: String,
      required: true,
      default: null,
      validate: {
        validator(trailerLink) { return validator.isURL(trailerLink); },
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator(thumbnail) { return validator.isURL(thumbnail); },
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
      default: null,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('movie', movieSchema);
