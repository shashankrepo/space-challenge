const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('../models/todo');

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
require('dotenv').config();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connected to Database'))
  .catch(err => console.log('Could not connect to Database', err));

app.get('/todo', async (req, res) => {
  try {
    const todo = await Todo.find();
    res.json({ success: true, todo });
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: 'Item could not be found' });
  }
});

app.post('/todo', async (req, res) => {
  try {
    const todo = new Todo({
      ...req.body,
    });
    await todo.save();
    res.json({ success: true, todo });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app.delete('/todo/:id', async (req, res) => {
  try {
    await Todo.findByIdAndRemove({ _id: req.params.id });
    res.json({ success: true });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: 'Item could not be found' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
