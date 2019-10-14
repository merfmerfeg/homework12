const express = require('express');
const cardsRoute = require('./routes/cards');
const usersRoute = require('./routes/users');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});

app.use(express.static('public'));
app.use(cardsRoute);
app.use(usersRoute);
//
app.get('/:page', (req, res) => {
  res.status(404);
  res.send({ message: 'Запрашиваемый ресурс не найден' });
});
