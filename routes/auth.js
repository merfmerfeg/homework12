const authRoute = require('express').Router();

const { createUser, loginUser } = require('../controllers/auth');

authRoute.post('/signin', loginUser);
authRoute.post('/signup', createUser);

module.exports = authRoute;
