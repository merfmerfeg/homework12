const mongoose = require('mongoose');
const helper = require('../helper');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    validate: {
      validator(v) {
        return helper.validateLink(v);
      },
      message: (props) => `${props.value} некорректная ссылка на изображение`,
    },
  },
});

module.exports = mongoose.model('user', userSchema);
