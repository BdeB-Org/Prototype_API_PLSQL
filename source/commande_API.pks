CREATE OR REPLACE PACKAGE commande_API IS

    -- Type personnalisé pour représenter une commande
    TYPE commande_rec IS RECORD (
        commande_id commande.commande_id%TYPE,
        date_commande commande.date_commande%TYPE,
        prix_total commande.prix_total%TYPE,
        status commande.status%TYPE
    );

    -- Récupérer les informations d'une commande par son ID
    FUNCTION get_commande (
        p_commande_id IN NUMBER
    ) RETURN VARCHAR2;

    -- Insérer une nouvelle commande
    FUNCTION ins_commande (
        p_date_commande IN commande.date_commande%TYPE,
        p_prix_total IN commande.prix_total%TYPE,
        p_status IN commande.status%TYPE DEFAULT 'En attente',
        p_test IN VARCHAR2 DEFAULT 'N'
    ) RETURN VARCHAR2;

    -- Mettre à jour une commande existante
    FUNCTION upd_commande (
        p_commande_id IN commande.commande_id%TYPE,
        p_prix_total IN commande.prix_total%TYPE DEFAULT NULL,
        p_status IN commande.status%TYPE DEFAULT NULL,
        p_test IN VARCHAR2 DEFAULT 'N'
    ) RETURN VARCHAR2;

    -- Supprimer une commande par son ID
    FUNCTION del_commande (
        p_commande_id IN commande.commande_id%TYPE,
        p_test IN VARCHAR2 DEFAULT 'N'
    ) RETURN VARCHAR2;

END commande_API;

