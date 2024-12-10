import http from "http";
import url from "url";
import { getCommande, insertCommande, updateCommande, deleteCommande } from "./commandeDB.mjs"; // Import des fonctions adaptées
import logger from "./logger_commande.js"; // Logger personnalisé
import httpStatus from "./http_status_commande.js"; // Codes HTTP

const hostname = "127.0.0.1";
const port = 3030;

// Fonction pour extraire le corps de la requête
async function extractBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => resolve(body));
    req.on("error", (err) => reject(err));
  });
}

// Fonction générique pour envoyer une réponse HTTP avec les bons en-têtes
function envoyerReponse(res, reponse, httpStatusCode = 200) {
  res.statusCode = httpStatusCode;
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(reponse));
}

// Création du serveur HTTP
const server = http.createServer(async (req, res) => {
  // Ajout des en-têtes pour gérer les CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Gérer les requêtes OPTIONS (prévols CORS)
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // Analyse de l'URL et extraction des paramètres
  const route = url.parse(req.url, true).pathname.split("/");
  const commandeId = route[2]; // Récupération de l'identifiant

  logger.log("info", `Requête reçue: ${req.method} ${req.url}`);

  // Routage des différentes actions liées à `commande`
  if (route[1] === "commande") {
    try {
      switch (req.method) {
        case "GET": {
          if (!commandeId) {
            envoyerReponse(res, { status: "error", message: "ID de commande requis" }, httpStatus.BAD_REQUEST);
            return;
          }
          const commande = await getCommande(commandeId);
          envoyerReponse(res, commande, httpStatus.SUCCESS);
          break;
        }
        case "POST": {
          const body = JSON.parse(await extractBody(req));
          const resultat = await insertCommande(body);
          envoyerReponse(res, resultat, httpStatus.CREATED);
          break;
        }
        case "PUT": {
          if (!commandeId) {
            envoyerReponse(res, { status: "error", message: "ID de commande requis pour la mise à jour" }, httpStatus.BAD_REQUEST);
            return;
          }
          const body = JSON.parse(await extractBody(req));
          const resultat = await updateCommande(commandeId, body);
          envoyerReponse(res, resultat, httpStatus.SUCCESS);
          break;
        }
        case "DELETE": {
          if (!commandeId) {
            envoyerReponse(res, { status: "error", message: "ID de commande requis pour la suppression" }, httpStatus.BAD_REQUEST);
            return;
          }
          const resultat = await deleteCommande(commandeId);
          envoyerReponse(res, resultat, httpStatus.SUCCESS);
          break;
        }
        default:
          envoyerReponse(res, { status: "error", message: "Méthode non supportée" }, httpStatus.Not_Implemented);
      }
    } catch (error) {
      logger.log("error", error.message);
      envoyerReponse(res, { status: "error", message: "Erreur interne du serveur" }, httpStatus.SERVER_ERROR);
    }
  } else {
    // Route non trouvée
    envoyerReponse(res, { status: "error", message: "Ressource non trouvée" }, httpStatus.NOT_FOUND);
  }
});

// Lancement du serveur
server.listen(port, hostname, () => {
  logger.log("info", `Le serveur fonctionne à l'adresse http://${hostname}:${port}/`);
});
