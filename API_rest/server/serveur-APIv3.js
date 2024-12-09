import http from "http";
import url from "url";
import { getClient, updateClient, insertClient, deleteClient } from "./clientsDB.mjs";

const hostname = "127.0.0.1";
const port = 3010;

// Fonction pour extraire le corps de la requête
async function extractBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => resolve(body));
    req.on("error", (err) => reject(err));
  });
}

const server = http.createServer(async (req, res) => {
  const route = url.parse(req.url, true).pathname.split("/");
  const clientId = route[2];

  if (route[1] === "clients") {
    try {
      if (req.method === "GET") {
        const data = await getClient(clientId);
        res.end(data);
      } else if (req.method === "POST") {
        const body = JSON.parse(await extractBody(req));
        const data = await insertClient(body);
        res.end(data);
      } else if (req.method === "PUT") {
        const body = JSON.parse(await extractBody(req));
        const data = await updateClient(clientId, body);
        res.end(data);
      } else if (req.method === "DELETE") {
        const data = await deleteClient(clientId);
        res.end(data);
      } else {
        res.statusCode = 405;
        res.end("Méthode non autorisée.");
      }
    } catch (err) {
      res.statusCode = 500;
      res.end("Erreur interne du serveur.");
    }
  } else {
    res.statusCode = 404;
    res.end("Ressource non trouvée.");
  }
});

server.listen(port, hostname, () => {
  console.log(`Serveur lancé sur http://${hostname}:${port}/`);
});
