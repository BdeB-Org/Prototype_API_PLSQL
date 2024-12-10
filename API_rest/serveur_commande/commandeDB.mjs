import logger from "./logger_commande.js";
import oracledb from "oracledb";
import dbConfig from "./dbconfig_commande.mjs";

/**
 * Récupère une commande par son ID.
 * @param {number} p_commande_id - ID de la commande à récupérer.
 * @returns {string} - Détails de la commande en JSON.
 */
export async function getCommande(p_commande_id) {
  if (!p_commande_id) {
    throw new Error("Le paramètre p_commande_id est null.");
  }

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    logger.log("info", "Connexion réussie à la base de données Oracle");

    const result = await connection.execute(
      `BEGIN
         :reto := commande_API.get_commande(:commande_id);
       END;`,
      {
        reto: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 4000 },
        commande_id: p_commande_id,
      }
    );

    // Retourne le résultat JSON fourni par la fonction PL/SQL
    return result.outBinds.reto;
  } catch (err) {
    logger.log("error", err);
    logger.log("error", "errorNum: " + err.errorNum);

    // Gestion des erreurs spécifiques (comme une commande non trouvée)
    if (err.errorNum === 20001) {
      return JSON.stringify({
        status: "error",
        statusCode: -2,
        message: "Aucune commande pour cet ID!",
      });
    }

    // Gestion des erreurs générales
    return JSON.stringify({
      status: "error",
      statusCode: -999,
      message: "Erreur non attrapée dans le catch",
    });
  } finally {
    if (connection) {
      try {
        await connection.close();
        logger.log("info", "Connexion fermée avec succès.");
      } catch (err) {
        logger.log("error", "Erreur lors de la fermeture de la connexion :", err);
      }
    }
  }
}

/**
 * Insère une nouvelle commande dans la base de données.
 * @param {Object} commande - Objet contenant les informations de la commande.
 * @returns {string} - Résultat de l'insertion en JSON.
 */
export async function insertCommande(commande) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `BEGIN
         :result := commande_API.ins_commande(:date_commande, :prix_total, :status, :test);
       END;`,
      {
        result: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 4000 },
        date_commande: commande.date_commande,
        prix_total: commande.prix_total,
        status: commande.status || "En attente",
        test: "N",
      }
    );
    await connection.commit();
    return result.outBinds.result;
  } catch (err) {
    logger.log("error", err.message);
    return JSON.stringify({
      status: "error",
      message: "Erreur lors de l'insertion de la commande.",
    });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        logger.log("error", "Erreur lors de la fermeture de la connexion :", err);
      }
    }
  }
}

/**
 * Met à jour les informations d'une commande.
 * @param {number} commandeId - ID de la commande à mettre à jour.
 * @param {Object} commande - Objet contenant les informations de la commande.
 * @returns {string} - Résultat de la mise à jour en JSON.
 */
export async function updateCommande(commandeId, commande) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `BEGIN
         :result := commande_API.upd_commande(:commande_id, :prix_total, :status);
       END;`,
      {
        result: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 4000 },
        commande_id: commandeId,
        prix_total: commande.prix_total,
        status: commande.status,
      }
    );
    await connection.commit();
    return result.outBinds.result;
  } catch (err) {
    logger.log("error", err.message);
    return JSON.stringify({
      status: "error",
      message: "Erreur lors de la mise à jour de la commande.",
    });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        logger.log("error", "Erreur lors de la fermeture de la connexion :", err);
      }
    }
  }
}

/**
 * Supprime une commande par son ID.
 * @param {number} commandeId - ID de la commande à supprimer.
 * @returns {string} - Résultat de la suppression en JSON.
 */
export async function deleteCommande(commandeId) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `BEGIN
         :result := commande_API.del_commande(:commande_id);
       END;`,
      {
        result: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 4000 },
        commande_id: commandeId,
      }
    );
    await connection.commit();
    return result.outBinds.result;
  } catch (err) {
    logger.log("error", err.message);
    return JSON.stringify({
      status: "error",
      message: "Erreur lors de la suppression de la commande.",
    });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        logger.log("error", "Erreur lors de la fermeture de la connexion :", err);
      }
    }
  }
}
