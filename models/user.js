const bcrypt = require('bcrypt')
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

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        // throw new Auth('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            // throw new Auth('Неправильные почта или пароль');
          }
          return user;
        });
    });
};

module.exports = model('user', userSchema)