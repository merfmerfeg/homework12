const cardsRoute = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

cardsRoute.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
}), createCard);


cardsRoute.get('/cards', getCards);
cardsRoute.delete('/cards/:id', deleteCard);
cardsRoute.put('/cards/:cardId/likes', likeCard);
cardsRoute.delete('/cards/:cardId/likes', dislikeCard);

module.exports = cardsRoute;
