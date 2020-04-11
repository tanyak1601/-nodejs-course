const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');
const catchError = require('../../common/catchError');
const createError = require('http-errors');

router.use(
  '/',
  catchError((req, res, next) => {
    if (!req.board) {
      throw createError(404, "Bad request (wrong board's id)");
    }
    next();
  })
);

router
  .route('/')
  .get(
    catchError(async (req, res) => {
      const tasks = await tasksService.getAll(req.board.id);
      res.json(tasks);
    })
  )
  .post(
    catchError(async (req, res) => {
      const newTask = await tasksService.createTask(req.board.id, req.body);

      if (!newTask) {
        throw createError(404, 'Bad request');
      }

      res.json(newTask);
    })
  );

router
  .route('/:taskId')
  .get(
    catchError(async (req, res) => {
      const task = await tasksService.findById(req.board.id, req.params.taskId);

      if (!task) {
        throw createError(404, 'Task not found');
      }

      return res.json(task);
    })
  )
  .put(
    catchError(async (req, res) => {
      const task = await tasksService.findById(req.board.id, req.params.taskId);

      if (!task) {
        throw createError(404, 'Task not found');
      }

      const updatedTask = await tasksService.updateTask(task, req.body);

      if (!updatedTask) {
        throw createError(404, 'Bad request');
      }

      res.json(updatedTask);
    })
  )
  .delete(
    catchError(async (req, res) => {
      const task = await tasksService.findById(req.board.id, req.params.taskId);

      if (!task) {
        throw createError(404, 'Task not found');
      }

      await tasksService.deleteTask(task);

      return res.status(204).end();
    })
  );

module.exports = router;
