import http from "http";
import url from "url";
import { getCommande, insertCommande, updateCommande, deleteCommande } from "./commandeDB.mjs"; // Fonctions pour l'entité commande
import logger from "./logger.js"; // Logger pour traquer les logs
import httpStatus from "./http_status.js"; // Codes HTTP

const hostname = "127.0.0.1";
const port = 3020;

// Fonction pour extraire le corps des requêtes
async function extractBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => resolve(body));
    req.on("error", (err) => reject(err));
  });
}

// Fonction pour envoyer une réponse uniforme
async function envoyer_reponse(res, reponse, httpStatusCode) {
  res.statusCode = httpStatusCode;
  res.setHeader("Access-Control-Allow-Origin", "*"); // Autorise toutes les origines
  res.setHeader("Content-Type", "application/json"); // Format JSON
  res.end(JSON.stringify(reponse)); // Sérialisation de la réponse en JSON
}

// Créez le serveur HTTP
const server = http.createServer(async (req, res) => {
  // Gestion des requêtes CORS prévols
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    });
    res.end();
    return;
  }

  // Analyse de l'URL de la requête
  const route = url.parse(req.url, true).pathname.split("/");
  const commandeId = route[2]; // ID de commande dans l'URL

  // Log de la requête
  logger.log("info", `Requête HTTP : ${req.url} - Méthode : ${req.method}`);

  // Gestion des routes pour les commandes
  if (route[1] === "commande") {
    try {
      if (req.method === "GET" && commandeId) {
        // Récupérer une commande par ID
        const data = await getCommande(commandeId);
        envoyer_reponse(res, { status: "success", data }, httpStatus.Success);
      } else if (req.method === "POST") {
        // Insérer une nouvelle commande
        const body = JSON.parse(await extractBody(req));
        const data = await insertCommande(body);
        envoyer_reponse(res, { status: "success", data }, httpStatus.Created);
      } else if (req.method === "PUT" && commandeId) {
        // Mettre à jour une commande
        const body = JSON.parse(await extractBody(req));
        const data = await updateCommande(commandeId, body);
        envoyer_reponse(res, { status: "success", data }, httpStatus.Success);
      } else if (req.method === "DELETE" && commandeId) {
        // Supprimer une commande
        const data = await deleteCommande(commandeId);
        envoyer_reponse(res, { status: "success", data }, httpStatus.Success);
      } else {
        envoyer_reponse(res, { status: "error", message: "Route non trouvée" }, httpStatus.Not_Found);
      }
    } catch (error) {
      logger.log("error", error.message);
      envoyer_reponse(res, { status: "error", message: "Erreur interne" }, httpStatus.Server_Error);
    }
  } else {
    envoyer_reponse(res, { status: "error", message: "Route non trouvée" }, httpStatus.Not_Found);
  }
});

// Lancement du serveur
server.listen(port, hostname, () => {
  logger.log("info", `Serveur actif à http://${hostname}:${port}/`);
});
