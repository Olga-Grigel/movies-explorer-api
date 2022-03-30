const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const UnauthorizedError = require('../errors/unauthorized-error');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator(email) { return validator.isEmail(email); },
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    versionKey: false,
  },
);

// аутентификация при логине(сравниваем есть ли такой емаил и пароль)
userSchema.statics.findOneByCredentials = function (email, password) {
  return this.findOne({ email }) // this — это модель User
    .select('+password')
    .then((user) => {
      if (!user) {
        // не нашёлся-перенаправляем на ошибку
        throw new UnauthorizedError('Неправильный email или пароль');
      }

      // нашёлся — сравниваем хеши
      return bcrypt
        .compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            // хеши не совпали-перенаправляем на ошибку
            throw new UnauthorizedError('Неправильный email или пароль');
          }

          return user;
        });
    });
};

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;

  return obj;
};

module.exports = mongoose.model('user', userSchema);
