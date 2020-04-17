const Board = require('./board.model');

const getAll = async () => {
  return Board.find({});
};

const findById = async id => {
  return Board.findById({ _id: id });
};

const createBoard = async data => {
  return Board.create(data);
};

const updateBoard = async (board, newParams) => {
  return Board.updateOne({ _id: board._id }, newParams);
};

const deleteBoard = async board => {
  return (await Board.deleteOne({ _id: board._id })).deletedCount;
};

module.exports = {
  getAll,
  findById,
  createBoard,
  updateBoard,
  deleteBoard
};
