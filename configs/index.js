require('dotenv').config;

const { JWT_SECRET, PORT, NODE_ENV, BD_ADRESS } = process.env;

const CURRENT_JWT_SECRET = NODE_ENV === 'production' && JWT_SECRET ? JWT_SECRET : 'develop-secret';
const CURRENT_PORT = NODE_ENV === 'production' && PORT ? PORT : 3000;
const CURRENT_BD_ADRESS = NODE_ENV === 'production' && BD_ADRESS ? BD_ADRESS : 'mongodb://localhost:27017/moviesdb';

module.exports = {
  CURRENT_JWT_SECRET,
  CURRENT_PORT,
  CURRENT_BD_ADRESS,
}