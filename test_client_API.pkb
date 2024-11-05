CREATE OR REPLACE PACKAGE BODY test_client_api IS

/**
     * Test de la fonction ins_client pour vérifier si l'insertion d'un client fonctionne correctement.
     * Utilise des valeurs valides pour les paramètres du client.
     * Affiche le résultat de l'insertion via DBMS_OUTPUT.
     * En cas d'erreur, affiche le message d'erreur.
     */

   PROCEDURE ins_client IS
      l_result VARCHAR2(4000);
   BEGIN
      l_result := client_API.ins_client(
         p_nom => 'Dupont',
         p_prenom => 'Jean',
         p_email => 'jean.dupont@example.com',
         p_telephone => '1234567890',
         p_adresse => '123 Rue Exemple'
      );
      DBMS_OUTPUT.put_line('Resultat ins_client: ' || l_result);
   EXCEPTION
      WHEN OTHERS THEN
         DBMS_OUTPUT.put_line('Erreur dans ins_client: ' || SQLERRM);
   END ins_client;
/**
     * Test de la fonction ins_client en passant un nom NULL pour vérifier les contraintes de la table.
     * Devrait renvoyer une erreur car le champ nom est NOT NULL.
     * Affiche le message d'erreur attendu via DBMS_OUTPUT.
     */
   PROCEDURE ins_client_null IS
      l_result VARCHAR2(4000);
   BEGIN
      l_result := client_API.ins_client(
         p_nom => NULL,
         p_prenom => 'Jean',
         p_email => 'jean.dupont@example.com',
         p_telephone => '1234567890',
         p_adresse => '123 Rue Exemple'
      );
      DBMS_OUTPUT.put_line('Resultat ins_client_null: ' || l_result);
   EXCEPTION
      WHEN OTHERS THEN
         DBMS_OUTPUT.put_line('Erreur attendue dans ins_client_null: ' || SQLERRM);
   END ins_client_null;
/**
     * Test de la fonction upd_client pour vérifier si la mise à jour d'un client fonctionne correctement.
     * Met à jour les champs nom et prénom pour le client ayant l'ID 1.
     * Affiche le résultat de la mise à jour via DBMS_OUTPUT.
     * En cas d'erreur, affiche le message d'erreur.
     */
   PROCEDURE upd_client IS
      l_result VARCHAR2(4000);
   BEGIN
      l_result := client_API.upd_client(
         p_client_id => 1,
         p_nom => 'Durand',
         p_prenom => 'Marie'
      );
      DBMS_OUTPUT.put_line('Resultat upd_client: ' || l_result);
   EXCEPTION
      WHEN OTHERS THEN
         DBMS_OUTPUT.put_line('Erreur dans upd_client: ' || SQLERRM);
   END upd_client;
/**
     * Test de la fonction del_client pour vérifier si la suppression d'un client fonctionne correctement.
     * Supprime le client ayant l'ID 1.
     * Affiche le résultat de la suppression via DBMS_OUTPUT.
     * En cas d'erreur, affiche le message d'erreur.
     */
   PROCEDURE del_client IS
      l_result VARCHAR2(4000);
   BEGIN
      l_result := client_API.del_client(
         p_client_id => 1
      );
      DBMS_OUTPUT.put_line('Resultat del_client: ' || l_result);
   EXCEPTION
      WHEN OTHERS THEN
         DBMS_OUTPUT.put_line('Erreur dans del_client: ' || SQLERRM);
   END del_client;
/**
     * Test de la fonction get_client pour vérifier si la récupération des informations d'un client fonctionne correctement.
     * Récupère les informations du client ayant l'ID 1.
     * Affiche le nom et le prénom du client via DBMS_OUTPUT.
     * En cas d'erreur, affiche le message d'erreur.
     */
   PROCEDURE get_client IS
      l_client client_API.client_rec;
   BEGIN
      l_client := client_API.get_client(
         p_client_id => 1
      );
      DBMS_OUTPUT.put_line('Resultat get_client: ' || l_client.nom || ' ' || l_client.prenom);
   EXCEPTION
      WHEN OTHERS THEN
         DBMS_OUTPUT.put_line('Erreur dans get_client: ' || SQLERRM);
   END get_client;

END test_client_api;


