const router = require('express').Router();
const boardsService = require('./board.service');
const tasksRouter = require('../tasks/task.router');
const createError = require('http-errors');
const catchError = require('../../common/catchError');

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
      res.json(boards);
    })
  )
  .post(
    catchError(async (req, res) => {
      const newBoard = await boardsService.createBoard(req.body);
      if (!newBoard) {
        throw createError(404, 'Bad request');
      }

      res.json(newBoard);
    })
  );

router
  .route('/:boardId')
  .get(
    catchError(async (req, res) => {
      if (!req.board) {
        throw createError(404, 'Board not found');
      }

      return res.json(req.board);
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

      res.json(updatedBoard);
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

router.use('/:boardId/tasks', tasksRouter);

module.exports = router;
