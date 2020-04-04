const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const findById = id => usersRepo.findById(id);

const createUser = data => usersRepo.createUser(data);

const updateUser = (user, newParams) => usersRepo.updateUser(user, newParams);

const deleteUser = user => usersRepo.deleteUser(user);

module.exports = {
  getAll,
  findById,
  createUser,
  updateUser,
  deleteUser
};
