const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');

router.use('/', (req, res, next) => {
  if (!req.board) {
    return res.status(404).json("Bad request (wrong board's id)");
  }
  next();
});

router
  .route('/')

  .get(async (req, res) => {
    const tasks = await tasksService.getAll(req.board.id);
    res.json(tasks);
  })

  .post(async (req, res) => {
    const newTask = await tasksService.createTask(req.board.id, req.body);

    if (!newTask) {
      res.status(404).json('Bad request');
    }

    res.json(newTask);
  });

router
  .route('/:taskId')

  .get(async (req, res) => {
    const task = await tasksService.findById(req.board.id, req.params.taskId);

    if (!task) {
      return res.status(404).json('Task not found');
    }

    return res.json(task);
  })

  .put(async (req, res) => {
    const task = await tasksService.findById(req.board.id, req.params.taskId);

    if (!task) {
      return res.status(404).json('Task not found');
    }

    const updatedTask = await tasksService.updateTask(task, req.body);

    if (!updatedTask) {
      res.status(400).json('Bad request');
    }

    res.json(updatedTask);
  })

  .delete(async (req, res) => {
    const task = await tasksService.findById(req.board.id, req.params.taskId);

    if (!task) {
      return res.status(404).json('Task not found');
    }

    await tasksService.deleteTask(task);

    return res.status(204).end();
  });

module.exports = router;
