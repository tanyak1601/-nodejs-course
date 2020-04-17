const boardsRepo = require('./board.db.repository');
const Task = require('../tasks/task.model');

const getAll = () => boardsRepo.getAll();

const findById = id => boardsRepo.findById(id);

const createBoard = data => boardsRepo.createBoard(data);

const updateBoard = (board, newParams) =>
  boardsRepo.updateBoard(board, newParams);

const deleteBoard = board => {
  Task.deleteMany({ boardId: board._id }).exec();
  return boardsRepo.deleteBoard(board);
};

module.exports = {
  getAll,
  findById,
  createBoard,
  updateBoard,
  deleteBoard
};
