const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'silly',
  format: format.combine(
    format.colorize(),
    format.cli(),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: format.combine(format.uncolorize(), format.json())
    }),
    new transports.File({
      filename: 'logs/info.log',
      level: 'info',
      format: format.combine(format.uncolorize(), format.json())
    })
  ]
});

const requestLogger = (req, res, next) => {
  const { originalUrl, query, body } = req;
  const jsonQuery = JSON.stringify(query);
  const jsonBody = JSON.stringify(body);

  const message = `level: 'info', url: ${originalUrl}, query params: ${jsonQuery}, body: ${jsonBody}`;

  logger.info(message);

  next();
};

module.exports = { requestLogger, logger };
