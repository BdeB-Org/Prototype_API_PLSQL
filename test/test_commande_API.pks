CREATE OR REPLACE PACKAGE test_commande_API IS
    /**
     * Teste l'insertion d'une commande.
     */
    PROCEDURE test_ins_commande;

    /**
     * Teste la mise à jour d'une commande.
     */
    PROCEDURE test_upd_commande;

    /**
     * Teste la suppression d'une commande.
     */
    PROCEDURE test_sup_commande;

    /**
     * Teste la récupération d'une commande par son ID.
     */
    PROCEDURE test_get_commande;
END test_commande_API;
