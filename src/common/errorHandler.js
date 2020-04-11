const { logger } = require('./logger');

/* eslint-disable-next-line no-unused-vars */
const errorHandler = (err, req, res, next) => {
  logger.error(
    `level 'error', error code: ${err.status}, error message: ${err}`
  );

  if (err.status === 404) {
    res.status(err.status).send(err.message);
  } else {
    res.status(500).send('Something broke!');
  }
};

module.exports = errorHandler;
