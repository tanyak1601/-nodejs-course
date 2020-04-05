const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.param('userId', async (req, res, next, userId) => {
  req.user = await usersService.findById(userId);
  next();
});

router
  .route('/')

  .get(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  })

  .post(async (req, res) => {
    const newUser = await usersService.createUser(req.body);
    if (!newUser) {
      res.status(404).json('Bad request');
    }

    res.json(User.toResponse(newUser));
  });

router
  .route('/:userId')

  .get(async (req, res) => {
    if (!req.user) {
      return res.status(404).json('User not found');
    }

    return res.json(User.toResponse(req.user));
  })

  .put(async (req, res) => {
    if (!req.user) {
      return res.status(404).json('Bad request');
    }

    const updatedUser = await usersService.updateUser(req.user, req.body);

    if (!updatedUser) {
      res.status(404).json('Bad request');
    }

    res.json(User.toResponse(updatedUser));
  })

  .delete(async (req, res) => {
    if (!req.user) {
      return res.status(404).json('User not found');
    }

    await usersService.deleteUser(req.user);

    return res.status(204).end();
  });

module.exports = router;
