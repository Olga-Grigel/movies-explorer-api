const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/not-found-error');
const auth = require('../middlewares/auth');
const { EmailPattern } = require('../config');
const { PasswordPattern } = require('../config');
const {
  createUser,
  login,
  signout,
} = require('../controllers/users');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(EmailPattern),
    password: Joi.string().required().pattern(PasswordPattern),
  }),
}), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).required().max(30),
    email: Joi.string().required().pattern(EmailPattern),
    password: Joi.string().required().pattern(PasswordPattern),
  }),
}), createUser);
router.post('/signout', signout);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.use('/*', auth, (request, response, next) => {
  next(new NotFoundError(`Ресурс по адресу "${request.path}" не найден`));
});

module.exports = router;
