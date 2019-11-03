const cardsRoute = require('express').Router();

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

cardsRoute.post('/cards', createCard);
cardsRoute.get('/cards', getCards);
cardsRoute.delete('/cards/:id', deleteCard);
cardsRoute.put('/cards/:cardId/likes', likeCard);
cardsRoute.delete('/cards/:cardId/likes', dislikeCard);

module.exports = cardsRoute;
