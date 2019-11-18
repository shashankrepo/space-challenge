const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 500 }
});

const Todo = mongoose.model('todos', schema);

module.exports = Todo;