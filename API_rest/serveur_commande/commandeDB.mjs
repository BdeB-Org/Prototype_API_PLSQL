import oracledb from "oracledb";
import dbConfig from "./dbconfig.mjs";
import logger from "./logger.js";

// Récupérer une commande par son ID
export async function getCommande(id) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `BEGIN :result := commande_API.get_commande(:id); END;`,
      { id, result: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 4000 } }
    );
    return JSON.parse(result.outBinds.result);
  } catch (error) {
    logger.log("error", error.message);
    throw new Error("Erreur lors de la récupération de la commande");
  } finally {
    if (connection) await connection.close();
  }
}

// Insérer une nouvelle commande
export async function insertCommande(commande) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `BEGIN :result := commande_API.ins_commande(:client_id, :date_commande, :prix_total, :status); END;`,
      {
        client_id: commande.client_id,
        date_commande: commande.date_commande,
        prix_total: commande.prix_total,
        status: commande.status,
        result: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 4000 },
      }
    );
    await connection.commit();
    return JSON.parse(result.outBinds.result);
  } catch (error) {
    logger.log("error", error.message);
    throw new Error("Erreur lors de l'insertion de la commande");
  } finally {
    if (connection) await connection.close();
  }
}

// Mettre à jour une commande
export async function updateCommande(id, commande) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `BEGIN :result := commande_API.upd_commande(:id, :prix_total, :status); END;`,
      {
        id,
        prix_total: commande.prix_total,
        status: commande.status,
        result: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 4000 },
      }
    );
    await connection.commit();
    return JSON.parse(result.outBinds.result);
  } catch (error) {
    logger.log("error", error.message);
    throw new Error("Erreur lors de la mise à jour de la commande");
  } finally {
    if (connection) await connection.close();
  }
}

// Supprimer une commande
export async function deleteCommande(id) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `BEGIN :result := commande_API.del_commande(:id); END;`,
      { id, result: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 4000 } }
    );
    await connection.commit();
    return JSON.parse(result.outBinds.result);
  } catch (error) {
    logger.log("error", error.message);
    throw new Error("Erreur lors de la suppression de la commande");
  } finally {
    if (connection) await connection.close();
  }
}
