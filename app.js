const express = require('express')
const mongoose = require('mongoose')
// const bodyParser = require('body-parser') // устарело? если да, то удалить из зависимостей

const { PORT = 3000 } = process.env

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`))