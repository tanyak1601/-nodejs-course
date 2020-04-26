const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const tasksRouter = require('../tasks/task.router');
const createError = require('http-errors');
const catchError = require('../../common/catchError');
const checkToken = require('../../common/checkToken');

router.param('boardId', async (req, res, next, boardId) => {
  try {
    req.board = await boardsService.findById(boardId);
    return next();
  } catch (err) {
    return next(err);
  }
});

router
  .route('/')
  .get(
    catchError(async (req, res) => {
      const boards = await boardsService.getAll();
      res.json(boards.map(Board.toResponse));
    })
  )
  .post(
    catchError(async (req, res) => {
      const newBoard = await boardsService.createBoard(req.body);
      if (!newBoard) {
        throw createError(404, 'Bad request');
      }

      res.json(Board.toResponse(newBoard));
    })
  );

router
  .route('/:boardId')
  .get(
    catchError(async (req, res) => {
      if (!req.board) {
        throw createError(404, 'Board not found');
      }

      return res.json(Board.toResponse(req.board));
    })
  )
  .put(
    catchError(async (req, res) => {
      if (!req.board) {
        throw createError(404, 'Bad request');
      }

      const updatedBoard = await boardsService.updateBoard(req.board, req.body);

      if (!updatedBoard) {
        throw createError(404, 'Bad request');
      }

      res.json(Board.toResponse(updatedBoard));
    })
  )
  .delete(
    catchError(async (req, res) => {
      if (!req.board) {
        throw createError(404, 'Board not found');
      }

      await boardsService.deleteBoard(req.board);

      return res.status(204).end();
    })
  );

router.use('/:boardId/tasks', checkToken, tasksRouter);

module.exports = router;
