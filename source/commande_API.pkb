CREATE OR REPLACE PACKAGE BODY commande_API IS

    -- Insérer une nouvelle commande
    FUNCTION ins_commande (
        p_client_id commande.client_id%TYPE,
        p_date_commande commande.date_commande%TYPE,
        p_prix_total commande.prix_total%TYPE,
        p_status commande.status%TYPE DEFAULT 'En attente',
        p_test VARCHAR2 DEFAULT 'N'
    ) RETURN VARCHAR2 IS
        l_commande_id commande.commande_id%TYPE;
        l_reponse VARCHAR2(4000);
    BEGIN
        INSERT INTO commande (client_id, date_commande, prix_total, status)
        VALUES (p_client_id, p_date_commande, p_prix_total, p_status)
        RETURNING commande_id INTO l_commande_id;

        IF p_test = 'N' THEN
            COMMIT;
        END IF;

        SELECT JSON_OBJECT('commande_id' VALUE l_commande_id)
        INTO l_reponse
        FROM dual;

        RETURN l_reponse;
    EXCEPTION
        WHEN OTHERS THEN
            RETURN '{"error": "' || SQLERRM || '"}';
    END ins_commande;

    -- Mettre à jour une commande existante
    FUNCTION upd_commande (
        p_commande_id commande.commande_id%TYPE,
        p_prix_total commande.prix_total%TYPE DEFAULT NULL,
        p_status commande.status%TYPE DEFAULT NULL,
        p_test VARCHAR2 DEFAULT 'N'
    ) RETURN VARCHAR2 IS
        l_nbre_rangee NUMBER;
        l_reponse VARCHAR2(4000);
    BEGIN
        UPDATE commande
        SET prix_total = NVL(p_prix_total, prix_total),
            status = NVL(p_status, status)
        WHERE commande_id = p_commande_id;

        l_nbre_rangee := SQL%ROWCOUNT;

        IF p_test = 'N' THEN
            COMMIT;
        END IF;

        SELECT JSON_OBJECT('nbre_rangee' VALUE l_nbre_rangee)
        INTO l_reponse
        FROM dual;

        RETURN l_reponse;
    EXCEPTION
        WHEN OTHERS THEN
            RETURN '{"error": "' || SQLERRM || '"}';
    END upd_commande;

    -- Supprimer une commande par son ID
    FUNCTION del_commande (
        p_commande_id commande.commande_id%TYPE,
        p_test VARCHAR2 DEFAULT 'N'
    ) RETURN VARCHAR2 IS
        l_nbre_rangee NUMBER;
        l_reponse VARCHAR2(4000);
    BEGIN
        DELETE FROM commande
        WHERE commande_id = p_commande_id;

        l_nbre_rangee := SQL%ROWCOUNT;

        IF p_test = 'N' THEN
            COMMIT;
        END IF;

        SELECT JSON_OBJECT('nbre_rangee' VALUE l_nbre_rangee)
        INTO l_reponse
        FROM dual;

        RETURN l_reponse;
    EXCEPTION
        WHEN OTHERS THEN
            RETURN '{"error": "' || SQLERRM || '"}';
    END del_commande;

    -- Récupérer les informations d'une commande
    FUNCTION get_commande (
        p_commande_id commande.commande_id%TYPE
    ) RETURN commande_rec IS
        l_commande commande_rec;
    BEGIN
        SELECT commande_id, client_id, date_commande, prix_total, status
        INTO l_commande
        FROM commande
        WHERE commande_id = p_commande_id;

        RETURN l_commande;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE_APPLICATION_ERROR(-20001, 'Commande introuvable');
        WHEN OTHERS THEN
            RAISE;
    END get_commande;

END commande_API;
/
