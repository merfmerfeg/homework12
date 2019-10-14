const usersRoute = require('express').Router();
const usersData = require('../data/users.json');

usersRoute.get('/users', (req, res) => {
  res.send(usersData);
});

usersRoute.get('/users/:id', (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  const user = usersData.find((item) => item._id === req.params.id);

  if (!user) {
    res.status(404);
    res.send({ error: 'Такого пользователя нет' });
  } else {
    res.send(user);
  }
});

module.exports = usersRoute;
