const User = require('../users/user.model');

const db = {
  users: [
    new User({ name: 'Tanya', login: 'Tanya-a-a', password: '123456' }),
    new User({ name: 'Ivan', login: 'Ivan123', password: '654321' }),
    new User({ name: 'Anna', login: 'anya111', password: 'asd121' }),
    new User({ name: 'Tom', login: 'TomTom', password: 'wer123' })
  ],
  boards: [],
  column: [],
  task: []
};

module.exports = { db };
