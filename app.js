require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { errorHandler } = require('./helpers/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// const bodyParser = require('body-parser') // устарело? если да, то удалить из зависимостей

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/diplomadb', { // заменить потом на moviesdb
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);
app.use(router);
app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT);
