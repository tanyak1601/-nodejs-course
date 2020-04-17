const tasksRepo = require('./task.db.repository');

const getAll = boardId => tasksRepo.getAll(boardId);

const findById = (boardId, taskId) => tasksRepo.findById(boardId, taskId);

const createTask = (boardId, data) => tasksRepo.createTask(boardId, data);

const updateTask = (task, newParams) => tasksRepo.updateTask(task, newParams);

const deleteTask = task => tasksRepo.deleteTask(task);

module.exports = {
  getAll,
  findById,
  createTask,
  updateTask,
  deleteTask
};
