const router = require('express').Router();
const boardsService = require('./board.service');
const tasksRouter = require('../tasks/task.router');

router.param('boardId', async (req, res, next, boardId) => {
  req.board = await boardsService.findById(boardId);
  next();
});

router
  .route('/')

  .get(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards);
  })

  .post(async (req, res) => {
    const newBoard = await boardsService.createBoard(req.body);
    if (!newBoard) {
      res.status(404).json('Bad request');
    }

    res.json(newBoard);
  });

router
  .route('/:boardId')

  .get(async (req, res) => {
    if (!req.board) {
      return res.status(404).json('Board not found');
    }

    return res.json(req.board);
  })

  .put(async (req, res) => {
    if (!req.board) {
      return res.status(404).json('Bad request');
    }

    const updatedBoard = await boardsService.updateBoard(req.board, req.body);

    if (!updatedBoard) {
      res.status(404).json('Bad request');
    }

    res.json(updatedBoard);
  })

  .delete(async (req, res) => {
    if (!req.board) {
      return res.status(404).json('Board not found');
    }

    await boardsService.deleteBoard(req.board);

    return res.status(204).end();
  });

router.use('/:boardId/tasks', tasksRouter);

module.exports = router;
