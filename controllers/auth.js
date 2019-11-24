const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const ENV_NAME = 'conf.env';
require('dotenv').config({ path: path.resolve(process.cwd(), ENV_NAME) });

const User = require('../models/user');
const AutorizationError = require('../errors/autorization-error');

const { NODE_ENV, JWT_SECRET } = process.env;

// Создать нового пользователя
const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => res.status(201).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))
    .catch((err) => {
      next(new AutorizationError(`Ошибка регистрации: ${(err.code === 11000)
        ? 'такой e-mail уже существует'
        : err.message}`));
    });
};

// Логин пользователя
const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id },
          (NODE_ENV === 'production') ? JWT_SECRET : 'super-strong-secret',
          { expiresIn: '7d' }),
      });
    })
    .catch(() => {
      next(new AutorizationError());
    });
};

module.exports = {
  loginUser, createUser,
};
