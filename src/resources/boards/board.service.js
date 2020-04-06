const boardsRepo = require('./board.memory.repository');
const taskService = require('../tasks/task.service');
const { db } = require('../db');

const getAll = () => boardsRepo.getAll();

const findById = id => boardsRepo.findById(id);

const createBoard = data => boardsRepo.createBoard(data);

const updateBoard = (board, newParams) =>
  boardsRepo.updateBoard(board, newParams);

const deleteBoard = board => {
  db.tasks.forEach(task => {
    if (task.boardId === board.id) {
      taskService.deleteTask(task);
    }
  });
  return boardsRepo.deleteBoard(board);
};

module.exports = {
  getAll,
  findById,
  createBoard,
  updateBoard,
  deleteBoard
};
