const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/not-found-error');
const auth = require('../middlewares/auth');
const {
  createUser,
  login,
  signout,
} = require('../controllers/users');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).required().max(30),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), createUser);
router.post('/signout', signout);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.use('/*', auth, (request, response, next) => {
  next(new NotFoundError(`Ресурс по адресу "${request.path}" не найден`));
});

module.exports = router;
