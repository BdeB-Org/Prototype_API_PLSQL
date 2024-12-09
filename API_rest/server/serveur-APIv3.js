import http from "http";
import url from "url";
import { getClient, updateClient, insertClient, deleteClient } from "./clientsDB.mjs"; // Vos fonctions pour la gestion des clients
import logger from "./logger.js"; // Le module de logger
import httpStatus from "./http_status"; // Module pour gérer les codes de statut HTTP

const hostname = "127.0.0.1";
const port = 3010;

async function extractBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => resolve(body));
    req.on("error", (err) => reject(err));
  });
}

// Fonction pour envoyer la réponse avec les bons en-têtes CORS et HTTP
async function envoyer_reponse(req, res, reponse, httpStatusCode) {
  res.statusCode = httpStatusCode;
  res.setHeader("Access-Control-Allow-Origin", "*"); // Autorise toutes les origines
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); // En-têtes autorisés
  res.setHeader("Content-Type", "application/json"); // Type de contenu JSON
  res.end(reponse); // Envoie la réponse au client
}

// Créez le serveur HTTP
const server = http.createServer(async (req, res) => {
  // Ajout des en-têtes CORS
  res.setHeader("Access-Control-Allow-Origin", "*"); // Autoriser toutes les origines
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Méthodes autorisées
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // En-têtes autorisés

  // Gérer les requêtes OPTIONS (prévols CORS)
  if (req.method === "OPTIONS") {
    res.writeHead(204); // Pas de contenu
    res.end();
    return;
  }

  // Analyse de l'URL de la requête
  const route = url.parse(req.url, true).pathname.split("/");
  const clientId = route[2]; // Paramètre d'identifiant de client

  // Log des détails de la requête
  logger.log("info", `Requête HTTP: ${req.url} - Méthode: ${req.method}`);

  // Gestion des routes liées aux clients
  if (route[1] === "clients") {
    try {
      if (req.method === "GET") {
        const data = await getClient(clientId); // Récupérer un client par son ID
        envoyer_reponse(req, res, data, httpStatus.Success); // Envoie la réponse
      } else if (req.method === "POST") {
        const body = JSON.parse(await extractBody(req)); // Extrait et parse le corps de la requête
        const data = await insertClient(body); // Insérer un nouveau client
        envoyer_reponse(req, res, data, httpStatus.Success); // Envoie la réponse
      } else if (req.method === "PUT") {
        const body = JSON.parse(await extractBody(req)); // Extrait et parse le corps de la requête
        const data = await updateClient(clientId, body); // Mettre à jour un client
        envoyer_reponse(req, res, data, httpStatus.Success); // Envoie la réponse
      } else if (req.method === "DELETE") {
        const data = await deleteClient(clientId); // Supprimer un client
        envoyer_reponse(req, res, data, httpStatus.Success); // Envoie la réponse
      } else {
        res.statusCode = 405; // Méthode non autorisée
        res.end("Méthode non autorisée.");
      }
    } catch (err) {
      res.statusCode = 500; // Erreur interne du serveur
      res.end("Erreur interne du serveur.");
    }
  } else {
    res.statusCode = 404; // Ressource non trouvée
    res.end("Ressource non trouvée.");
  }
});

// Démarrage du serveur
server.listen(port, hostname, () => {
  logger.log("info", `Serveur lancé sur http://${hostname}:${port}/`);
});
