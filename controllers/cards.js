const Card = require('../models/card');
const AutorizationError = require('../errors/autorization-error');
const AccessError = require('../errors/access-error');
const NotFoundError = require('../errors/not-found-error');

// Получить все карточки
const getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

// Новая карточка
const createCard = (req, res, next) => {
  const objCard = {
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id,
  };

  Card.create(objCard)
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      next(new AutorizationError(err.message));
    });
};

// Удалить карточку
const deleteCard = (req, res, next) => {
  // Находим карточку, проверяем авторизирован ее хозяин или нет
  Card.findById(req.params.id)
    .populate('owner')
    .then((card) => {
      if (card) {
        // Если карточка существует
        if (card.owner.id !== req.user._id) {
          // Авторизирован не хозяин карточки
          throw new AccessError();
        } else {
          // Авторизирован хозяин, удаляем карточку
          Card.findByIdAndRemove(req.params.id)
            .then((cardData) => res.send({ data: cardData }));
        }
      } else {
        // Если карточка не существует
        throw new NotFoundError('Карточка с таким id не найдена');
      }
    })
    .catch(next);
};

function changeLikeCard(req, res, next, liked) {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card) {
        // карточка найдена
        Card.findByIdAndUpdate(req.params.cardId, (liked)
          ? {
            // дабавление лайка
            $addToSet: { likes: req.user._id },
          }
          : {
            // удаление лайка
            $pull: { likes: req.user._id },
          },
        { new: true })
          .then((cardData) => res.send({ data: cardData }))
          .catch(next);
      } else {
        // карточка не найдена
        throw new NotFoundError('Карточка с таким id не найдена');
      }
    })
    .catch(next);
}

// Снять лайк карточке
const dislikeCard = (req, res, next) => {
  changeLikeCard(req, res, next, false);
};

// Лайкнуть карточку
const likeCard = (req, res, next) => {
  changeLikeCard(req, res, next, true);
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
