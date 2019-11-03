const usersRoute = require('express').Router();
const {
  getUsers, getUserByID, createUser, updateProfile, updateAvatar,
} = require('../controllers/users');

usersRoute.post('/users', createUser);
usersRoute.get('/users', getUsers);
usersRoute.get('/users/:id', getUserByID);
usersRoute.patch('/users/me', updateProfile);
usersRoute.patch('/users/me/avatar', updateAvatar);

module.exports = usersRoute;
