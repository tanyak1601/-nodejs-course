const User = require('./user.model');

const getAll = async () => {
  return User.find({});
};

const findById = async id => {
  return User.findById({ _id: id });
};

const createUser = async data => {
  return User.create(data);
};

const updateUser = async (user, newParams) => {
  return User.updateOne({ _id: user._id }, newParams);
};

const deleteUser = async user => {
  return (await User.deleteOne({ _id: user._id })).deletedCount;
};

module.exports = {
  getAll,
  findById,
  createUser,
  updateUser,
  deleteUser
};
