create or replace PACKAGE client_API IS

/**
     * Enregistrement représentant les informations d'un client.
     * Contient les champs : client_id, nom, prénom, email, téléphone, et adresse.
     */

    TYPE client_rec IS RECORD (
        client_id clients.client_id%TYPE,
        nom clients.nom%TYPE,
        prenom clients.prenom%TYPE,
        email clients.email%TYPE,
        telephone clients.telephone%TYPE,
        adresse clients.adresse%TYPE
    );
 /**
     * Table d'enregistrements de clients.
     * Permet de stocker plusieurs enregistrements de type client_rec.
     */
    TYPE client_tab IS TABLE OF client_rec;

 /**
     * Insère un nouveau client dans la table clients.
     * @param p_nom Nom du client.
     * @param p_prenom Prénom du client.
     * @param p_email Adresse email du client.
     * @param p_telephone Numéro de téléphone du client (optionnel).
     * @param p_adresse Adresse du client (optionnel).
     * @param p_test Indicateur de test (par défaut 'N'). Si 'N', un commit est effectué.
     * @return Un objet JSON contenant l'ID du client inséré ou un message d'erreur.
     */
    FUNCTION ins_client (
        p_nom clients.nom%TYPE, 
        p_prenom clients.prenom%TYPE,
        p_email clients.email%TYPE,
        p_telephone clients.telephone%TYPE DEFAULT NULL,
        p_adresse clients.adresse%TYPE DEFAULT NULL,
        p_test VARCHAR2 DEFAULT 'N'
    ) RETURN VARCHAR2;

/**
     * Met à jour les informations d'un client existant.
     * @param p_client_id ID du client à mettre à jour.
     * @param p_nom Nouveau nom du client, ou NULL pour conserver l'actuel.
     * @param p_prenom Nouveau prénom du client, ou NULL pour conserver l'actuel.
     * @param p_email Nouvelle adresse email du client, ou NULL pour conserver l'actuelle.
     * @param p_telephone Nouveau numéro de téléphone du client, ou NULL pour conserver l'actuel.
     * @param p_adresse Nouvelle adresse du client, ou NULL pour conserver l'actuelle.
     * @param p_test Indicateur de test (par défaut 'N'). Si 'N', un commit est effectué.
     * @return Un objet JSON contenant le nombre de rangées affectées ou un message d'erreur.
     */
    FUNCTION upd_client (
        p_client_id clients.client_id%TYPE,
        p_nom clients.nom%TYPE DEFAULT NULL,
        p_prenom clients.prenom%TYPE DEFAULT NULL,
        p_email clients.email%TYPE DEFAULT NULL,
        p_telephone clients.telephone%TYPE DEFAULT NULL,
        p_adresse clients.adresse%TYPE DEFAULT NULL,
        p_test VARCHAR2 DEFAULT 'N'
    ) RETURN VARCHAR2;

/**
     * Supprime un client de la table clients.
     * @param p_client_id ID du client à supprimer.
     * @param p_test Indicateur de test (par défaut 'N'). Si 'N', un commit est effectué.
     * @return Un objet JSON contenant le nombre de rangées affectées ou un message d'erreur.
     */
    FUNCTION del_client (
        p_client_id clients.client_id%TYPE,
        p_test VARCHAR2 DEFAULT 'N'
    ) RETURN VARCHAR2;

/**
     * Récupère les informations d'un client par son ID.
     * @param p_client_id ID du client à récupérer.
     * @return Un enregistrement de type client_rec contenant les informations du client ou NULL si non trouvé.
     */

    FUNCTION get_client (
        p_client_id clients.client_id%TYPE
    ) RETURN client_rec;

END client_API;

