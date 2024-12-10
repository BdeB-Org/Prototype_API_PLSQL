CREATE OR REPLACE PACKAGE BODY commande_API AS

    -- Constante globale pour journalisation
    gc_scope_prefix CONSTANT VARCHAR2(31) := LOWER($$plsql_unit) || '.';

    -- Récupérer une commande par son ID
    FUNCTION get_commande (
        p_commande_id IN NUMBER
    ) RETURN VARCHAR2 IS
        l_result VARCHAR2(4000);
    BEGIN
        SELECT JSON_OBJECT(
                   'commande_id' VALUE commande_id,
                   'date_commande' VALUE TO_CHAR(date_commande, 'YYYY-MM-DD'),
                   'prix_total' VALUE prix_total,
                   'status' VALUE status
               )
          INTO l_result
          FROM commande
         WHERE commande_id = p_commande_id;

        RETURN l_result;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RETURN '{"status":"error","message":"Commande non trouvée"}';
        WHEN OTHERS THEN
            RETURN '{"status":"error","message":"Erreur interne"}';
    END get_commande;

    -- Insérer une nouvelle commande
    FUNCTION ins_commande (
        p_date_commande IN commande.date_commande%TYPE,
        p_prix_total IN commande.prix_total%TYPE,
        p_status IN commande.status%TYPE DEFAULT 'En attente',
        p_test IN VARCHAR2 DEFAULT 'N'
    ) RETURN VARCHAR2 IS
        l_commande_id commande.commande_id%TYPE;
        l_response VARCHAR2(4000);
    BEGIN
        INSERT INTO commande (date_commande, prix_total, status)
        VALUES (p_date_commande, p_prix_total, p_status)
        RETURNING commande_id INTO l_commande_id;

        IF p_test = 'N' THEN
            COMMIT;
        END IF;

        l_response := JSON_OBJECT(
            'status' VALUE 'success',
            'commande_id' VALUE l_commande_id
        );

        RETURN l_response;
    EXCEPTION
        WHEN OTHERS THEN
            RETURN '{"status":"error","message":"Erreur lors de l\'insertion"}';
    END ins_commande;

    -- Mettre à jour une commande existante
    FUNCTION upd_commande (
        p_commande_id IN commande.commande_id%TYPE,
        p_prix_total IN commande.prix_total%TYPE DEFAULT NULL,
        p_status IN commande.status%TYPE DEFAULT NULL,
        p_test IN VARCHAR2 DEFAULT 'N'
    ) RETURN VARCHAR2 IS
        l_updated_rows NUMBER;
        l_response VARCHAR2(4000);
    BEGIN
        UPDATE commande
        SET prix_total = NVL(p_prix_total, prix_total),
            status = NVL(p_status, status)
        WHERE commande_id = p_commande_id;

        l_updated_rows := SQL%ROWCOUNT;

        IF l_updated_rows = 0 THEN
            RAISE_APPLICATION_ERROR(-20002, 'Commande introuvable pour mise à jour');
        END IF;

        IF p_test = 'N' THEN
            COMMIT;
        END IF;

        l_response := JSON_OBJECT(
            'status' VALUE 'success',
            'updated_rows' VALUE l_updated_rows
        );

        RETURN l_response;
    EXCEPTION
        WHEN OTHERS THEN
            RETURN '{"status":"error","message":"Erreur lors de la mise à jour"}';
    END upd_commande;

    -- Supprimer une commande par son ID
    FUNCTION del_commande (
        p_commande_id IN commande.commande_id%TYPE,
        p_test IN VARCHAR2 DEFAULT 'N'
    ) RETURN VARCHAR2 IS
        l_deleted_rows NUMBER;
        l_response VARCHAR2(4000);
    BEGIN
        DELETE FROM commande
        WHERE commande_id = p_commande_id;

        l_deleted_rows := SQL%ROWCOUNT;

        IF l_deleted_rows = 0 THEN
            RAISE_APPLICATION_ERROR(-20003, 'Commande introuvable pour suppression');
        END IF;

        IF p_test = 'N' THEN
            COMMIT;
        END IF;

        l_response := JSON_OBJECT(
            'status' VALUE 'success',
            'deleted_rows' VALUE l_deleted_rows
        );

        RETURN l_response;
    EXCEPTION
        WHEN OTHERS THEN
            RETURN '{"status":"error","message":"Erreur lors de la suppression"}';
    END del_commande;

END commande_API;
