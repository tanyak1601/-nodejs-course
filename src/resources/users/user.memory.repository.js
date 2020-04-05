const { db } = require('../db');
const User = require('./user.model');

const getAll = async () => db.users;

const findById = async id => db.users.find(user => user.id === id);

const createUser = async data => {
  if (data.name && data.login && data.password) {
    const user = new User(data);
    db.users.push(user);
    return user;
  }

  return null;
};

const updateUser = (user, newParams) => {
  if (newParams.name && newParams.login && newParams.password) {
    Object.assign(user, newParams);
    return user;
  }

  return null;
};

const deleteUser = user => {
  const index = db.users.findIndex(el => el === user);
  const deleteCount = 1;
  db.users.splice(index, deleteCount);
};

module.exports = {
  getAll,
  findById,
  createUser,
  updateUser,
  deleteUser
};
