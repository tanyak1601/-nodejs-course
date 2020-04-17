const usersRepo = require('./user.db.repository');
const Task = require('../tasks/task.model');

const getAll = () => usersRepo.getAll();

const findById = id => usersRepo.findById(id);

const createUser = data => usersRepo.createUser(data);

const updateUser = (user, newParams) => usersRepo.updateUser(user, newParams);

const deleteUser = user => {
  Task.updateMany({ userId: user._id }, { userId: null }).exec();
  return usersRepo.deleteUser(user);
};

module.exports = {
  getAll,
  findById,
  createUser,
  updateUser,
  deleteUser
};
