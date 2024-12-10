import http from "http";
import url from "url";
import { getClient, updateClient, insertClient, deleteClient } from "./clientsDB.mjs";
import logger from "./logger.js";

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

function envoyer_reponse(res, reponse, httpStatusCode = 200) {
  res.statusCode = httpStatusCode;
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  res.end(reponse);
}

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const route = url.parse(req.url, true).pathname.split("/");
  const clientId = route[2];

  logger.log("info", `Requête reçue : ${req.method} ${req.url}`);

  if (route[1] === "clients") {
    try {
      if (req.method === "GET") {
        const data = await getClient(clientId);
        envoyer_reponse(res, data);
      } else if (req.method === "POST") {
        const body = JSON.parse(await extractBody(req));
        const data = await insertClient(body);
        envoyer_reponse(res, data);
      } else if (req.method === "PUT") {
        const body = JSON.parse(await extractBody(req));
        const data = await updateClient(clientId, body);
        envoyer_reponse(res, data);
      } else if (req.method === "DELETE") {
        const data = await deleteClient(clientId);
        envoyer_reponse(res, data);
      } else {
        envoyer_reponse(res, JSON.stringify({ message: "Méthode non autorisée" }), 405);
      }
    } catch (err) {
      logger.log("error", `Erreur : ${err.message}`);
      envoyer_reponse(res, JSON.stringify({ error: err.message }), 500);
    }
  } else {
    envoyer_reponse(res, JSON.stringify({ message: "Ressource non trouvée" }), 404);
  }
});

server.listen(port, hostname, () => {
  logger.log("info", `Serveur en cours d'exécution sur http://${hostname}:${port}/`);
});
