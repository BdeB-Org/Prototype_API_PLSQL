import oracledb from "oracledb";
import dbConfig from "./dbconfig.mjs";

/**
 * Récupère un client par son ID.
 * @param {number} clientId - ID du client à récupérer.
 * @returns {string} - Détails du client en JSON.
 */
export async function getClient(clientId) {
  if (!clientId) {
    throw new Error("Le paramètre clientId est null.");
  }

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `BEGIN
         :result := client_tapi.get_client(:client_id);
       END;`,
      {
        result: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 4000 },
        client_id: clientId,
      }
    );
    return result.outBinds.result;
  } catch (err) {
    return JSON.stringify({
      status: "error",
      message: "Erreur lors de la récupération du client.",
    });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

/**
 * Met à jour les informations d'un client.
 * @param {number} clientId - ID du client à mettre à jour.
 * @param {Object} client - Objet contenant les informations du client.
 * @returns {string} - Résultat de la mise à jour en JSON.
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
 * Insère un nouveau client dans la base de données.
 * @param {Object} client - Objet contenant les informations du client.
 * @returns {string} - Résultat de l'insertion en JSON.
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
 * Supprime un client par son ID.
 * @param {number} clientId - ID du client à supprimer.
 * @returns {string} - Résultat de la suppression en JSON.
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
