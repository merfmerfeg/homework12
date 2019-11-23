const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');

const cardsRoute = require('./routes/cards');
const usersRoute = require('./routes/users');
const userAuth = require('./routes/auth');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const NotFoundError = require('./errors/not-found-error');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

// Для ограничения источников скриптов и других ресурсов
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

// подключаем rate-limiter
app.use(limiter);

// Для обработки body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Коннект к БД
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// логгер запросов
app.use(requestLogger);

// Авторизация не требуется
app.use(userAuth);

app.use(require('./middlewares/auth'));

// Авторизация требуется
app.use(cardsRoute);
app.use(usersRoute);

// eslint-disable-next-line no-unused-vars
app.use('*', (req, res, next) => {
  next(new NotFoundError());
});

// логгер ошибок
app.use(errorLogger);

app.use(errors()); // обработчик ошибок celebrate

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
