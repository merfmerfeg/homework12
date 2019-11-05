const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cardsRoute = require('./routes/cards');
const usersRoute = require('./routes/users');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

// Для обработки body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Коннект к БД
mongoose.connect('mongodb://localhost:27017/MestoDB', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// Хардкод юзера
app.use((req, res, next) => {
  req.user = {
    id: '5dbe5783c057461704496738',
  };

  next();
});

app.use(cardsRoute);
app.use(usersRoute);

//
app.get('/:page', (req, res) => {
  res.status(404);
  res.send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
