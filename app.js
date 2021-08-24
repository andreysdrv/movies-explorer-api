const express = require('express')
const mongoose = require('mongoose')
// const bodyParser = require('body-parser') // устарело? если да, то удалить из зависимостей

const { PORT = 3000 } = process.env

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const app = express()

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});