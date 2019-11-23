const authRoute = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { createUser, loginUser } = require('../controllers/auth');

// Авторизация пользователя
authRoute.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  }),
}), loginUser);

// Регистрация пользователя
authRoute.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

module.exports = authRoute;
