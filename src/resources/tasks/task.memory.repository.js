const { db } = require('../db');
const Task = require('./task.model');

const getAll = async boardId =>
  db.tasks.filter(task => task.boardId === boardId);

const findById = async (boardId, taskId) => {
  const tasks = await getAll(boardId);
  return tasks.find(task => task.id === taskId);
};

const createTask = async (boardId, data) => {
  if (data.title && data.description) {
    data.boardId = boardId;
    const task = new Task(data);
    db.tasks.push(task);
    return task;
  }

  return null;
};

const updateTask = (task, newParams) => {
  if (
    newParams.id &&
    newParams.title &&
    newParams.description &&
    newParams.boardId
  ) {
    Object.assign(task, newParams);
    return task;
  }

  return null;
};

const deleteTask = task => {
  const index = db.tasks.findIndex(el => el === task);
  const deleteCount = 1;
  db.tasks.splice(index, deleteCount);
};

module.exports = {
  getAll,
  findById,
  createTask,
  updateTask,
  deleteTask
};
