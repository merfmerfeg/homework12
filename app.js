const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const cardsRoute = require('./routes/cards');
const usersRoute = require('./routes/users');
const userAuth = require('./routes/auth');

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
});

// Авторизация не требуется
app.use(userAuth);

app.use(require('./middlewares/auth'));

// Авторизация требуется
app.use(cardsRoute);
app.use(usersRoute);


app.get('/:page', (req, res) => {
  res.status(404);
  res.send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
