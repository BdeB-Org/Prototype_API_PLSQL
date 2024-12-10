CREATE OR REPLACE PACKAGE BODY test_commande_API AS

  -- Test pour la fonction get_commande
  PROCEDURE test_get_commande IS
    l_result VARCHAR2(4000);
  BEGIN
    DBMS_OUTPUT.PUT_LINE('Début du test : get_commande');
    l_result := commande_API.get_commande(1); -- Remplacer par un ID valide
    DBMS_OUTPUT.PUT_LINE('Résultat : ' || l_result);
    DBMS_OUTPUT.PUT_LINE('Fin du test : get_commande');
  EXCEPTION
    WHEN OTHERS THEN
      DBMS_OUTPUT.PUT_LINE('Erreur dans le test get_commande : ' || SQLERRM);
  END test_get_commande;

  -- Test pour la procédure ins_commande
  PROCEDURE test_ins_commande IS
    l_result VARCHAR2(4000);
  BEGIN
    DBMS_OUTPUT.PUT_LINE('Début du test : ins_commande');
    l_result := commande_API.ins_commande(
      SYSDATE, 150.50, 'En attente', 'N'
    );
    DBMS_OUTPUT.PUT_LINE('Résultat : ' || l_result);
    DBMS_OUTPUT.PUT_LINE('Fin du test : ins_commande');
  EXCEPTION
    WHEN OTHERS THEN
      DBMS_OUTPUT.PUT_LINE('Erreur dans le test ins_commande : ' || SQLERRM);
  END test_ins_commande;

  -- Test pour la procédure upd_commande
  PROCEDURE test_upd_commande IS
    l_result VARCHAR2(4000);
  BEGIN
    DBMS_OUTPUT.PUT_LINE('Début du test : upd_commande');
    l_result := commande_API.upd_commande(
      1, -- Remplacer par un ID valide
      200.75, 'En cours', 'N'
    );
    DBMS_OUTPUT.PUT_LINE('Résultat : ' || l_result);
    DBMS_OUTPUT.PUT_LINE('Fin du test : upd_commande');
  EXCEPTION
    WHEN OTHERS THEN
      DBMS_OUTPUT.PUT_LINE('Erreur dans le test upd_commande : ' || SQLERRM);
  END test_upd_commande;

  -- Test pour la procédure del_commande
  PROCEDURE test_del_commande IS
    l_result VARCHAR2(4000);
  BEGIN
    DBMS_OUTPUT.PUT_LINE('Début du test : del_commande');
    l_result := commande_API.del_commande(1, 'N'); -- Remplacer par un ID valide
    DBMS_OUTPUT.PUT_LINE('Résultat : ' || l_result);
    DBMS_OUTPUT.PUT_LINE('Fin du test : del_commande');
  EXCEPTION
    WHEN OTHERS THEN
      DBMS_OUTPUT.PUT_LINE('Erreur dans le test del_commande : ' || SQLERRM);
  END test_del_commande;

END test_commande_API;

