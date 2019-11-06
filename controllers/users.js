/* eslint-disable no-underscore-dangle */
const User = require('../models/user');
const Helper = require('../helper');

// Получить всех пользователей
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// Получить пользователя по id
const getUserByID = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res.status(400).send({ message: 'Пользователь с таким id не найден' });
      }
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

// Обновить профиль пользователя
const updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(Helper.getErrorNumber(err)).send({ message: err.message }));
};

// Обновить аватар пользователя
const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(Helper.getErrorNumber(err)).send({ message: err.message }));
};

module.exports = {
  getUsers, getUserByID, updateProfile, updateAvatar,
};
