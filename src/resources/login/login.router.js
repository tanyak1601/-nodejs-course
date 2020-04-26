const router = require('express').Router();
const loginService = require('./login.service');
const createError = require('http-errors');
const catchError = require('../../common/catchError');

router.route('/').post(
  catchError(async (req, res) => {
    const token = await loginService.authorization(req.body);

    if (!token) {
      throw createError(403, 'Incorrect login or password');
    }

    res.json({ token });
  })
);

module.exports = router;
