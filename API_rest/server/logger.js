import winston from 'winston';

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

winston.addColors(colors);

const logger = winston.createLogger({
  level: "debug",
  format,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "logs/example.log",
    }),
  ],
});

export default logger;
