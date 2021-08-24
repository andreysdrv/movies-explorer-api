const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
    validate: {
      validator(email) {
        return isEmail(email)
      }
    }
  },
  password: {
    type: String,
    required: true,
    unique: true,
    select: false,
  },
  name: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 30,
  },
})

module.exports = model('user', userSchema)