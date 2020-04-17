const Task = require('./task.model');

const getAll = async id => {
  return Task.find({ boardId: id });
};

const findById = async (boardId, taskId) => {
  return Task.findOne({ boardId, _id: taskId });
};

const createTask = async (boardId, data) => {
  return Task.create({ ...data, boardId });
};

const updateTask = async (task, newParams) => {
  return Task.updateOne({ _id: task._id }, newParams);
};

const deleteTask = async task => {
  return (await Task.deleteOne({ _id: task._id })).deletedCount;
};

module.exports = {
  getAll,
  findById,
  createTask,
  updateTask,
  deleteTask
};
