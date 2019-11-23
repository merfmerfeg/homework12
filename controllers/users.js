/* eslint-disable no-underscore-dangle */
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');

// Получить всех пользователей
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

// Получить пользователя по id
const getUserByID = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new NotFoundError('Пользователь с таким id не найден');
      }
    })
    .catch(next);
};

// Обновить профиль пользователя
const updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
  })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

// Обновить аватар пользователя
const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
  })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports = {
  getUsers, getUserByID, updateProfile, updateAvatar,
};
