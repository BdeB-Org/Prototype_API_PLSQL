import http from "http";
import url from "url";
import { getCommande, insertCommande } from "./commandeDB.mjs";
import logger from "./logger.js";
import httpStatus from "./http_status.js";

const hostname = "127.0.0.1";
const port = 3020;

// Serveur HTTP
const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const route = parsedUrl.pathname.split("/")[1];
    const id = parsedUrl.pathname.split("/")[2];

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");

    try {
        if (route === "commande" && req.method === "GET") {
            // Gestion de la requête GET
            const commande = await getCommande(id);
            res.statusCode = httpStatus.SUCCESS;
            res.end(JSON.stringify(commande));
        } else if (route === "commande" && req.method === "POST") {
            // Gestion de la requête POST
            let body = "";
            req.on("data", (chunk) => (body += chunk));
            req.on("end", async () => {
                const commandeData = JSON.parse(body);
                const newCommande = await insertCommande(commandeData);
                res.statusCode = httpStatus.SUCCESS;
                res.end(JSON.stringify(newCommande));
            });
        } else {
            // Route non trouvée
            res.statusCode = httpStatus.NOT_FOUND;
            res.end(JSON.stringify({ error: "Route introuvable" }));
        }
    } catch (error) {
        // Gestion des erreurs
        logger.error(error.message);
        res.statusCode = httpStatus.SERVER_ERROR;
        res.end(JSON.stringify({ error: "Erreur interne" }));
    }
});

server.listen(port, hostname, () => {
    logger.info(`Serveur actif à http://${hostname}:${port}/`);
});
