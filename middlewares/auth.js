const jwt = require('jsonwebtoken');
const path = require('path');

const ENV_NAME = 'conf.env';
require('dotenv').config({ path: path.resolve(process.cwd(), ENV_NAME) });

const { NODE_ENV, JWT_SECRET } = process.env;

const AutorizationError = require('../errors/autorization-error');

const extractBearerToken = (header) => header.replace('Bearer ', '');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AutorizationError());
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, (NODE_ENV === 'production') ? JWT_SECRET : 'super-strong-secret');
  } catch (err) {
    next(new AutorizationError());
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
