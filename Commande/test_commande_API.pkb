CREATE OR REPLACE PACKAGE BODY test_commande_API IS

/**
 * Teste l'insertion d'une commande.
 */
PROCEDURE test_ins_commande IS
    v_result VARCHAR2(100);
BEGIN
    logger.log('INFO', 'Test de la procédure ins_commande');
    v_result := commande_API.ins_commande(1, SYSDATE, 100.50, 'En cours');
    logger.log('INFO', 'Résultat du test ins_commande : ' || v_result);
END test_ins_commande;

/**
 * Teste la mise à jour d'une commande.
 */
PROCEDURE test_upd_commande IS
    v_result VARCHAR2(100);
BEGIN
    logger.log('INFO', 'Test de la procédure upd_commande');
    v_result := commande_API.upd_commande(1, 120.75, 'Livrée');
    logger.log('INFO', 'Résultat du test upd_commande : ' || v_result);
END test_upd_commande;

/**
 * Teste la suppression d'une commande.
 */
PROCEDURE test_sup_commande IS
    v_result VARCHAR2(100);
BEGIN
    logger.log('INFO', 'Test de la procédure sup_commande');
    v_result := commande_API.sup_commande(1);
    logger.log('INFO', 'Résultat du test sup_commande : ' || v_result);
END test_sup_commande;

/**
 * Teste la récupération d'une commande par son ID.
 */
 PROCEDURE test_get_commande IS
    v_commande commande_API.commande_rec;
BEGIN
    logger.log('INFO', 'Test de la procédure get_commande');
    v_commande := commande_API.get_commande(1);
    IF v_commande.commande_id IS NOT NULL THEN
        logger.log('INFO', 'Commande trouvée avec ID : ' || v_commande.commande_id);
    ELSE
        logger.log('WARN', 'Aucune commande trouvée');
    END IF;
END test_get_commande;

END test_commande_API;