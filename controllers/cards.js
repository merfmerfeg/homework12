const Card = require('../models/card');
const Helper = require('../helper');

// Получить все карточки
const getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// Новая карточка
const createCard = (req, res) => {
  const objCard = {
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id,
  };

  Card.create(objCard)
    .then((card) => res.status(201).res.send({ data: card }))
    .catch((err) => res.status(Helper.getErrorNumber(err)).send({ message: err.message }));
};

// Удалить карточку
const deleteCard = (req, res) => {
  // Находим карточку, проверяем авторизирован ее хозяин или нет
  Card.findById(req.params.id)
    .populate('owner')
    .then((card) => {
      if (card) {
        // Если карточка существует
        if (card.owner.id !== req.user._id) {
          // Авторизирован не хозяин карточки
          res.status(403).send({ message: 'Ошибка доступа' });
        } else {
          // Авторизирован хозяин, удаляем карточку
          Card.findByIdAndRemove(req.params.id)
            .then((cardData) => res.send({ data: cardData }));
        }
      } else {
        // Если карточка не существует
        res.status(400).send({ message: 'Карточка с таким id не найдена' });
      }
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

// Лайкнуть карточку
const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, {
    $addToSet: {
      likes: req.user._id,
    },
  }, // добавить id в массив, если его там нет
  { new: true })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// Снять лайк карточке
const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, {
    $pull: {
      likes: req.user._id,
    },
  }, // убрать id из массива
  { new: true })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
