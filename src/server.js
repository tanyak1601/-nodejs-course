const { PORT } = require('./common/config');
const app = require('./app');
const connectToDB = require('./db/dbClient');
const { logger } = require('./common/logger');

connectToDB(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});

process
  .on('uncaughtException', error => {
    logger.error(`captured error: ${error.message}`);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  })
  /* eslint-disable-next-line no-unused-vars */
  .on('unhandledRejection', (reason, promise) => {
    logger.error(`Unhandled rejection detected: ${reason.message}`);
  });
