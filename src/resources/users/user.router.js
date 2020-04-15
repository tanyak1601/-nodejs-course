const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const createError = require('http-errors');
const catchError = require('../../common/catchError');

router.param('userId', async (req, res, next, userId) => {
  try {
    req.user = await usersService.findById(userId);
    return next();
  } catch (err) {
    return next(err);
  }
});

router
  .route('/')
  .get(
    catchError(async (req, res) => {
      const users = await usersService.getAll();
      res.json(users.map(User.toResponse));
    })
  )
  .post(
    catchError(async (req, res) => {
      const newUser = await usersService.createUser(req.body);
      if (!newUser) {
        throw createError(404, 'Bad request');
      }

      res.json(User.toResponse(newUser));
    })
  );

router
  .route('/:userId')
  .get(
    catchError(async (req, res) => {
      if (!req.user) {
        throw createError(404, 'User not found');
      }

      return res.json(User.toResponse(req.user));
    })
  )
  .put(
    catchError(async (req, res) => {
      if (!req.user) {
        throw createError(404, 'Bad request');
      }

      const updatedUser = await usersService.updateUser(req.user, req.body);

      if (!updatedUser) {
        throw createError(404, 'Bad request');
      }

      res.json(User.toResponse(updatedUser));
    })
  )

  .delete(
    catchError(async (req, res) => {
      if (!req.user) {
        throw createError(404, 'User not found');
      }

      await usersService.deleteUser(req.user);

      return res.status(204).end();
    })
  );

module.exports = router;
