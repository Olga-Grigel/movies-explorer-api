const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  updateUser,
  getUserMe,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

router.get('/me', auth, getUserMe);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required(),
  }),
}), auth, updateUser);

module.exports = router;
