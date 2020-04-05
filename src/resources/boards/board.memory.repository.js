const { db } = require('../db');
const { Board } = require('./board.model');

const getAll = async () => db.boards;

const findById = async id => db.boards.find(board => board.id === id);

const createBoard = async data => {
  if (data.title && data.columns) {
    const board = new Board(data);
    db.boards.push(board);
    return board;
  }

  return null;
};

const updateBoard = (board, newParams) => {
  if (newParams.title && newParams.columns) {
    Object.assign(board, newParams);
    return board;
  }

  return null;
};

const deleteBoard = board => {
  const index = db.boards.findIndex(el => el === board);
  const deleteCount = 1;
  db.boards.splice(index, deleteCount);
};

module.exports = {
  getAll,
  findById,
  createBoard,
  updateBoard,
  deleteBoard
};
