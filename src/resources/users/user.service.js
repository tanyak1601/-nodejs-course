const usersRepo = require('./user.memory.repository');
const { db } = require('../db');

const getAll = () => usersRepo.getAll();

const findById = id => usersRepo.findById(id);

const createUser = data => usersRepo.createUser(data);

const updateUser = (user, newParams) => usersRepo.updateUser(user, newParams);

const deleteUser = user => {
  db.tasks.forEach(task => {
    if (task.userId === user.id) {
      task.userId = null;
    }

    return;
  });
  return usersRepo.deleteUser(user);
};

module.exports = {
  getAll,
  findById,
  createUser,
  updateUser,
  deleteUser
};
