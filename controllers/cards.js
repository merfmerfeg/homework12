/* eslint-disable no-underscore-dangle */
const Card = require('../models/card');
const Helper = require('../helper');

// Получить все карточки
module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// Новая карточка
module.exports.createCard = (req, res) => {
  const objCard = {
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id,
  };

  Card.create(objCard)
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(Helper.getErrorNumber(err)).send({ message: err.message }));
};

// Удалить карточку
module.exports.deleteCard = (req, res) => {
  // Находим карточку, проверяем авторизирован ее хозяин или нет
  Card.findById(req.params.id)
    .populate('owner')
    .then((card) => {
      if (card.owner.id !== req.user._id) {
        // Авторизирован не хозяин карточки
        res.status(400).send({ message: 'Ошибка доступа' });
      } else {
        // Авторизирован хозяин, удаляем карточку
        Card.findByIdAndRemove(req.params.id)
          .then((cardData) => res.send({ data: cardData }));
      }
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

// Лайкнуть карточку
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, {
    $addToSet: {
      likes: req.user.id,
    },
  }, // добавить id в массив, если его там нет
  { new: true })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// Снять лайк карточке
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, {
    $pull: {
      likes: req.user.id,
    },
  }, // убрать id из массива
  { new: true })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};
