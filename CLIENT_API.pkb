create or replace PACKAGE BODY client_API IS
  
    FUNCTION ins_client (
        p_nom clients.nom%TYPE, 
        p_prenom clients.prenom%TYPE,
        p_email clients.email%TYPE,
        p_telephone clients.telephone%TYPE DEFAULT NULL,
        p_adresse clients.adresse%TYPE DEFAULT NULL,
        p_test VARCHAR2 DEFAULT 'N'
    ) RETURN VARCHAR2 AS
        gc_scope_prefix CONSTANT VARCHAR2(31) := LOWER($$plsql_unit) || '.';
        l_scope         logger_logs.scope%type := gc_scope_prefix || 'ins_client';
        l_params        logger.tab_param;
        l_client_id     clients.client_id%TYPE;
        l_reponse       VARCHAR2(4000);
    BEGIN
        logger.append_param(l_params, 'p_nom: ', p_nom);
        logger.append_param(l_params, 'p_prenom: ', p_prenom);
        logger.append_param(l_params, 'p_email: ', p_email);
        logger.append_param(l_params, 'p_telephone: ', p_telephone);
        logger.append_param(l_params, 'p_adresse: ', p_adresse);
        logger.append_param(l_params, 'p_test: ', p_test);
        logger.log('>>>D?BUT de la proc?dure', l_scope, NULL, l_params);

        INSERT INTO clients (
            nom, prenom, email, telephone, adresse
        ) VALUES (
            p_nom, p_prenom, p_email, p_telephone, p_adresse
        ) RETURNING client_id INTO l_client_id;

        logger.append_param(l_params, 'l_client_id: ', l_client_id);
        logger.log('>>>FIN de la proc?dure', l_scope, NULL, l_params);

        IF p_test = 'N' THEN
            COMMIT;
        END IF;
        -- Cr?ation d'un objet JSON avec l'id_client
        SELECT JSON_OBJECT(key 'client_id' value l_client_id)
        INTO l_reponse
        FROM dual;

        RETURN l_reponse;
    END ins_client;

   
    FUNCTION upd_client (
        p_client_id clients.client_id%TYPE,
        p_nom clients.nom%TYPE DEFAULT NULL,
        p_prenom clients.prenom%TYPE DEFAULT NULL,
        p_email clients.email%TYPE DEFAULT NULL,
        p_telephone clients.telephone%TYPE DEFAULT NULL,
        p_adresse clients.adresse%TYPE DEFAULT NULL,
        p_test VARCHAR2 DEFAULT 'N'
    ) RETURN VARCHAR2 IS
        gc_scope_prefix      CONSTANT VARCHAR2(31) := LOWER($$plsql_unit) || '.';
        l_scope              logger_logs.scope%TYPE := gc_scope_prefix || 'upd_client';
        l_params             logger.tab_param;
        l_nbre_rangee        NUMBER;
        l_reponse            VARCHAR2(4000);
        r_client             clients%ROWTYPE;

    BEGIN
        logger.append_param(l_params, 'p_client_id: ', p_client_id);
        logger.append_param(l_params, 'p_nom: ', p_nom);
        logger.append_param(l_params, 'p_prenom: ', p_prenom);
        logger.append_param(l_params, 'p_email: ', p_email);
        logger.append_param(l_params, 'p_telephone: ', p_telephone);
        logger.append_param(l_params, 'p_adresse: ', p_adresse);
        logger.log('>>>D?BUT de la proc?dure', l_scope, NULL, l_params);

        SELECT * INTO r_client
        FROM clients
        WHERE client_id = p_client_id;
         -- Mise ? jour du client
        UPDATE clients
        SET
            nom = NVL(p_nom, r_client.nom),
            prenom = NVL(p_prenom, r_client.prenom),
            email = NVL(p_email, r_client.email),
            telephone = NVL(p_telephone, r_client.telephone),
            adresse = NVL(p_adresse, r_client.adresse)
        WHERE client_id = p_client_id;

        l_nbre_rangee := SQL%ROWCOUNT;
        logger.append_param(l_params, 'sql%ROWCOUNT: ', l_nbre_rangee);
        logger.log('>>>FIN de la proc?dure', l_scope, NULL, l_params);

        IF p_test = 'N' THEN
            COMMIT;
        END IF;

        -- Cr?ation d'un objet JSON avec le nombre de rang?es
        SELECT JSON_OBJECT(key 'nbre_rangee' value l_nbre_rangee)
        INTO l_reponse
        FROM dual;

        RETURN l_reponse;
    END upd_client;


    FUNCTION del_client (
        p_client_id clients.client_id%TYPE,
        p_test VARCHAR2 DEFAULT 'N'
    ) RETURN VARCHAR2 IS
        gc_scope_prefix CONSTANT VARCHAR2(31) := LOWER($$plsql_unit) || '.';
        l_scope         logger_logs.scope%TYPE := gc_scope_prefix || 'del_client';
        l_params        logger.tab_param;
        l_nbre_rangee   NUMBER;
        l_reponse       VARCHAR2(4000);

    BEGIN
        logger.append_param(l_params, 'p_client_id: ', p_client_id);
        logger.log('>>>D?BUT de la proc?dure', l_scope, NULL, l_params);
        
        DELETE FROM clients
        WHERE client_id = p_client_id;

        l_nbre_rangee := SQL%ROWCOUNT;
        logger.append_param(l_params, 'sql%ROWCOUNT: ', l_nbre_rangee);
        logger.log('>>>FIN de la proc?dure', l_scope, NULL, l_params);

        IF p_test = 'N' THEN
            COMMIT;
        END IF;

        -- Cr?ation d'un objet JSON avec le nombre de rang?es
        SELECT JSON_OBJECT(key 'nbre_rangee' value l_nbre_rangee)
        INTO l_reponse
        FROM dual;

        RETURN l_reponse;
    END del_client;


    FUNCTION get_client (
        p_client_id clients.client_id%TYPE
    ) RETURN client_rec IS
        gc_scope_prefix CONSTANT VARCHAR2(31) := LOWER($$plsql_unit) || '.';
        l_scope         logger_logs.scope%TYPE := gc_scope_prefix || 'get_client';
        l_params        logger.tab_param;
        l_client client_rec;

    BEGIN
        logger.append_param(l_params, 'p_client_id: ', p_client_id);
        logger.log('>>>D?BUT de la proc?dure', l_scope, NULL, l_params);

        SELECT client_id, nom, prenom, email, telephone, adresse
        INTO l_client.client_id, l_client.nom, l_client.prenom, l_client.email, l_client.telephone, l_client.adresse
        FROM clients
        WHERE client_id = p_client_id;
logger.log('>>>FIN de la proc?dure', l_scope, NULL, l_params);

        RETURN l_client;
    END get_client;

END client_API;