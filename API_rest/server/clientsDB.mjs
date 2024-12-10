import logger from "./logger.js";
import oracledb from "oracledb";
import dbConfig from "./dbconfig.mjs";

/**
 * Récupère un client par son ID.
 */
export async function getClient(p_client_id) {
  if (!p_client_id) {
    throw new Error("Le paramètre p_client_id est null.");
  }

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    logger.log("info", "Connexion réussie à la base de données Oracle");

    const result = await connection.execute(
      `BEGIN
         :reto := client_API.get_client(:client_id);
       END;`,
      {
        reto: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 4000 },
        client_id: p_client_id,
      }
    );

    return result.outBinds.reto;
  } catch (err) {
    logger.log("error", `Erreur lors de la récupération : ${err.message}`);
    if (err.errorNum === 20001) {
      return JSON.stringify({
        status: "error",
        statusCode: -2,
        message: "Aucun client pour cet ID!",
      });
    }
    return JSON.stringify({
      status: "error",
      statusCode: -999,
      message: "Erreur non attrapée dans le catch.",
    });
  } finally {
    if (connection) {
      try {
        await connection.close();
        logger.log("info", "Connexion fermée avec succès.");
      } catch (err) {
        logger.log("error", `Erreur lors de la fermeture : ${err.message}`);
      }
    }
  }
}

/**
 * Met à jour un client.
 */
export async function updateClient(clientId, client) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `BEGIN
         :result := client_tapi.update_client(:client_id, :nom, :prenom, :email, :telephone, :adresse);
       END;`,
      {
        result: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 4000 },
        client_id: clientId,
        nom: client.NOM,
        prenom: client.PRENOM,
        email: client.EMAIL,
        telephone: client.TELEPHONE,
        adresse: client.ADRESSE,
      }
    );
    await connection.commit();
    return result.outBinds.result;
  } catch (err) {
    logger.log("error", `Erreur lors de la mise à jour : ${err.message}`);
    return JSON.stringify({
      status: "error",
      message: "Erreur lors de la mise à jour du client.",
    });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

/**
 * Insère un client.
 */
export async function insertClient(client) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `BEGIN
         :result := client_tapi.insert_client(:nom, :prenom, :email, :telephone, :adresse);
       END;`,
      {
        result: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 4000 },
        nom: client.NOM,
        prenom: client.PRENOM,
        email: client.EMAIL,
        telephone: client.TELEPHONE,
        adresse: client.ADRESSE,
      }
    );
    await connection.commit();
    return result.outBinds.result;
  } catch (err) {
    logger.log("error", `Erreur lors de l'insertion : ${err.message}`);
    return JSON.stringify({
      status: "error",
      message: "Erreur lors de l'insertion du client.",
    });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

/**
 * Supprime un client.
 */
export async function deleteClient(clientId) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `BEGIN
         :result := client_tapi.delete_client(:client_id);
       END;`,
      {
        result: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 4000 },
        client_id: clientId,
      }
    );
    await connection.commit();
    return result.outBinds.result;
  } catch (err) {
    logger.log("error", `Erreur lors de la suppression : ${err.message}`);
    return JSON.stringify({
      status: "error",
      message: "Erreur lors de la suppression du client.",
    });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}
