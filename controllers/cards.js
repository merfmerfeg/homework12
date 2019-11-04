const Card = require('../models/card');

// Получить все карточки
module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('user')
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// Новая карточка
module.exports.createCard = (req, res) => {
  const objCard = {
    name: req.body.name,
    link: req.body.link,
    owner: req.user.id,
  };

  Card.create(objCard)
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(422).send({ message: err.message }));
};

// Удалить карточку
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => res.send({ data: card }))
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
