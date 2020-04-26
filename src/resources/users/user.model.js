const mongoose = require('mongoose');
const uuid = require('uuid');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const userSchema = new mongoose.Schema(
  {
    name: String,
    login: String,
    password: String,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

userSchema.pre('save', async function fn(next) {
  const hash = await bcrypt.hash(this.password, saltRounds);
  this.password = hash;
  next();
});

userSchema.pre('updateOne', async function fn(next) {
  const hash = await bcrypt.hash(this._update.password, saltRounds);
  this._update.password = hash;
  next();
});

userSchema.statics.toResponse = user => {
  const { _id, name, login } = user;
  return { id: _id, name, login };
};

const User = mongoose.model('User', userSchema);

module.exports = User;
