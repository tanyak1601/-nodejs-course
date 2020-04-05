const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const findById = id => boardsRepo.findById(id);

const createBoard = data => boardsRepo.createBoard(data);

const updateBoard = (board, newParams) =>
  boardsRepo.updateBoard(board, newParams);

const deleteBoard = board => boardsRepo.deleteBoard(board);

module.exports = {
  getAll,
  findById,
  createBoard,
  updateBoard,
  deleteBoard
};
