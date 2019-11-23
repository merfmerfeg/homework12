const usersRoute = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getUserByID, updateProfile, updateAvatar,
} = require('../controllers/users');

// получить всех пользователей
usersRoute.get('/users', getUsers);

// получить одного пользователя
usersRoute.get('/users/:id', getUserByID);

// обновить данные текущего пользователя
usersRoute.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfile);

// обновить аватар текущего пользователя
usersRoute.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required(),
  }),
}), updateAvatar);

module.exports = usersRoute;
