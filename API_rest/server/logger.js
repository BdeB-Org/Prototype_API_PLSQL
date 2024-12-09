import  winston  from 'winston';
// Define different colors for each level.
// Colors make the log message more visible,
// adding the ability to focus or ignore messages.
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};
//Chose the aspect of your log customizing the log format.
const format = winston.format.combine(
  // Add the message timestamp with the preferred format
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  // Tell Winston that the logs must be colored
  winston.format.colorize({ all: true }),
  // Define the format of the message showing the timestamp, the level and the message
  winston.format.printf(
    (info) => ${info.timestamp} ${info.level}: ${info.message}
  )
);
//Tell winston that you want to link the colors
//defined above to the severity levels.
winston.addColors(colors);
const logger = winston.createLogger({
  level: "debug",
  format, //:winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "logs/example.log",
    }),
  ],
});
export default logger;