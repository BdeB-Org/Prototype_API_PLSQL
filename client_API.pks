create or replace PACKAGE client_API IS
    -- Déclaration d'un enregistrement pour représenter un client
    TYPE client_rec IS RECORD (
        client_id clients.client_id%TYPE,
        nom clients.nom%TYPE,
        prenom clients.prenom%TYPE,
        email clients.email%TYPE,
        telephone clients.telephone%TYPE,
        adresse clients.adresse%TYPE
    );

    -- Déclaration d'une table d'enregistrements de clients
    TYPE client_tab IS TABLE OF client_rec;

    -- Fonction pour insérer un client
    FUNCTION ins_client (
        p_nom clients.nom%TYPE, 
        p_prenom clients.prenom%TYPE,
        p_email clients.email%TYPE,
        p_telephone clients.telephone%TYPE DEFAULT NULL,
        p_adresse clients.adresse%TYPE DEFAULT NULL,
        p_test VARCHAR2 DEFAULT 'N'
    ) RETURN VARCHAR2;

    -- Fonction pour mettre à jour un client
    FUNCTION upd_client (
        p_client_id clients.client_id%TYPE,
        p_nom clients.nom%TYPE DEFAULT NULL,
        p_prenom clients.prenom%TYPE DEFAULT NULL,
        p_email clients.email%TYPE DEFAULT NULL,
        p_telephone clients.telephone%TYPE DEFAULT NULL,
        p_adresse clients.adresse%TYPE DEFAULT NULL,
        p_test VARCHAR2 DEFAULT 'N'
    ) RETURN VARCHAR2;

    -- Fonction pour supprimer un client
    FUNCTION del_client (
        p_client_id clients.client_id%TYPE,
        p_test VARCHAR2 DEFAULT 'N'
    ) RETURN VARCHAR2;

    -- Fonction pour obtenir un client par son ID
    FUNCTION get_client (
        p_client_id clients.client_id%TYPE
    ) RETURN client_rec;

END client_API;

