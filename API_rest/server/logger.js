import winston from 'winston';

// Définir différentes couleurs pour chaque niveau
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

// Personnaliser le format du log
const format = winston.format.combine(
  // Ajouter un horodatage avec le format préféré
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  // Indiquer à Winston que les logs doivent être colorés
  winston.format.colorize({ all: true }),
  // Définir le format du message en affichant l'horodatage, le niveau et le message
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

// Associer les couleurs définies aux niveaux de sévérité
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
