const cardsRoute = require('express').Router();
const cardsData = require('../data/cards.json');

cardsRoute.get('/cards', (req, res) => {
  res.send(cardsData);
});
//
module.exports = cardsRoute;
