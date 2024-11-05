CREATE OR REPLACE PACKAGE BODY commande_API IS

/**
 * Insère une nouvelle commande dans la table.
 * @param p_client_id ID du client.
 * @param p_date_commande Date de la commande.
 * @param p_prix_total Prix total de la commande.
 * @param p_status Statut de la commande, par défaut 'En attente'.
 * @return Message indiquant le succès ou l'échec de l'opération.
 */
FUNCTION ins_commande (
p_client_id NUMBER,
p_date_commande DATE,
p_prix_total NUMBER,
p_status VARCHAR2 DEFAULT 'En attente'
) RETURN VARCHAR2 IS
BEGIN
logger.log('INFO', 'Début de la fonction ins_commande');
INSERT INTO commande (client_id, date_commande, prix_total, status)
VALUES (p_client_id, p_date_commande, p_prix_total, p_status);
COMMIT;
logger.log('INFO', 'Commande insérée avec succès');
RETURN 'Commande insérée avec succès';
EXCEPTION
WHEN OTHERS THEN
    logger.log('ERROR', 'Erreur dans ins_commande : ' || SQLERRM);
    RETURN 'Erreur : ' || SQLERRM;
END ins_commande;

/**
 * Met à jour une commande existante.
 * @param p_commande_id ID de la commande à mettre à jour.
 * @param p_prix_total Nouveau prix total, ou NULL pour conserver l'actuel.
 * @param p_status Nouveau statut, ou NULL pour conserver l'actuel.
 * @return Message indiquant le succès ou l'échec de l'opération.
 */
FUNCTION upd_commande (
    p_commande_id NUMBER,
    p_prix_total NUMBER DEFAULT NULL,
    p_status VARCHAR2 DEFAULT NULL
) RETURN VARCHAR2 IS
BEGIN
    logger.log('INFO', 'Début de la fonction upd_commande');
    UPDATE commande
    SET 
        prix_total = NVL(p_prix_total, prix_total),
        status = NVL(p_status, status)
    WHERE commande_id = p_commande_id;
    COMMIT;
    logger.log('INFO', 'Commande mise à jour avec succès');
    RETURN 'Commande mise à jour avec succès';
EXCEPTION
    WHEN OTHERS THEN
        logger.log('ERROR', 'Erreur dans upd_commande : ' || SQLERRM);
        RETURN 'Erreur : ' || SQLERRM;
END upd_commande;

/**
 * Supprime une commande de la table.
 * @param p_commande_id ID de la commande à supprimer.
 * @return Message indiquant le succès ou l'échec de l'opération.
 */
FUNCTION sup_commande (
    p_commande_id NUMBER
) RETURN VARCHAR2 IS
BEGIN
    logger.log('INFO', 'Début de la fonction sup_commande');
    DELETE FROM commande
    WHERE commande_id = p_commande_id;
    COMMIT;
    logger.log('INFO', 'Commande supprimée avec succès');
    RETURN 'Commande supprimée avec succès';
EXCEPTION
    WHEN OTHERS THEN
        logger.log('ERROR', 'Erreur dans sup_commande : ' || SQLERRM);
        RETURN 'Erreur : ' || SQLERRM;
END sup_commande;

/**
 * Récupère une commande par son ID.
 * @param p_commande_id ID de la commande à récupérer.
 * @return Un enregistrement de commande ou NULL si non trouvé.
 */
FUNCTION get_commande (
    p_commande_id NUMBER
) RETURN commande_rec IS
    v_commande commande_rec;
BEGIN
    logger.log('INFO', 'Début de la fonction get_commande');
    SELECT commande_id, client_id, date_commande, prix_total, status
    INTO v_commande
    FROM commande
    WHERE commande_id = p_commande_id;
    logger.log('INFO', 'Commande trouvée avec ID : ' || v_commande.commande_id);
    RETURN v_commande;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        logger.log('WARN', 'Aucune commande trouvée avec l ID spécifié');
        RETURN NULL;
    WHEN OTHERS THEN
        logger.log('INFO', 'Erreur dans get_commande : ' || SQLERRM);
        RAISE;
END get_commande;

END commande_API;
