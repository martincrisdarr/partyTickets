import winston from 'winston';
import settings from '../settings';

const format =
  process.env.NODE_ENV == 'development'
    ? winston.format.combine(winston.format.json(), winston.format.prettyPrint())
    : winston.format.json();

const logger = winston.createLogger({
  level: settings.loggerLevel,
  format,
  transports: [new winston.transports.Console()],
});

export default logger;
