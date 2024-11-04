CREATE OR REPLACE PACKAGE BODY test_client_api IS
--test si les commits marche correctement
   -- Test de la fonction ins_client
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

   -- Test de la fonction ins_client avec nom NULL (vérification des contraintes)
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

   -- Test de la fonction upd_client
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

   -- Test de la fonction del_client
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

   -- Test de la fonction get_client
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


