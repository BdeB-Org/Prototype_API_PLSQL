import oracledb from "oracledb";
import dbConfig from "./dbconfig.mjs"; // Configuration pour se connecter à la base Oracle

/**
 * Récupère une commande par son ID.
 * @param {number} id - ID de la commande à récupérer.
 * @returns {Promise<Object>} - Les détails de la commande en JSON.
 */
export async function getCommande(id) {
    if (!id) throw new Error("L'ID de la commande est requis");

    let connection;
    try {
        // Connexion à la base de données Oracle
        connection = await oracledb.getConnection(dbConfig);

        // Appel de la fonction PL/SQL
        const result = await connection.execute(
            `BEGIN
                :result := commande_API.get_commande(:id);
            END;`,
            {
                id: { val: id, dir: oracledb.BIND_IN },
                result: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 4000 },
            }
        );

        // Conversion du résultat JSON
        return JSON.parse(result.outBinds.result);
    } catch (err) {
        console.error("Erreur lors de la récupération de la commande :", err);
        throw new Error("Erreur lors de la récupération de la commande");
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error("Erreur lors de la fermeture de la connexion :", err);
            }
        }
    }
}

/**
 * Insère une nouvelle commande dans la base de données.
 * @param {Object} commande - Détails de la commande à insérer.
 * @returns {Promise<Object>} - Résultat de l'insertion en JSON.
 */
export async function insertCommande(commande) {
    if (!commande) throw new Error("Les données de la commande sont requises");

    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);

        const result = await connection.execute(
            `BEGIN
                :result := commande_API.ins_commande(:client_id, :date_commande, :prix_total, :status);
            END;`,
            {
                client_id: commande.client_id,
                date_commande: commande.date_commande,
                prix_total: commande.prix_total,
                status: commande.status || "En attente",
                result: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 4000 },
            }
        );

        await connection.commit();
        return JSON.parse(result.outBinds.result);
    } catch (err) {
        console.error("Erreur lors de l'insertion de la commande :", err);
        throw new Error("Erreur lors de l'insertion de la commande");
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error("Erreur lors de la fermeture de la connexion :", err);
            }
        }
    }
}
