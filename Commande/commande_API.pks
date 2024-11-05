CREATE OR REPLACE PACKAGE commande_API IS
TYPE commande_rec IS RECORD (
    commande_id commande.commande_id%TYPE,
    client_id commande.client_id%TYPE,
    date_commande commande.date_commande%TYPE,
    prix_total commande.prix_total%TYPE,
    status commande.status%TYPE
);

 /**
     * Insère une nouvelle commande dans la table.
     *
     * @param p_client_id L'identifiant du client.
     * @param p_date_commande La date de la commande.
     * @param p_prix_total Le prix total de la commande.
     * @param p_status Le statut de la commande, par défaut "En attente".
     * @return Un message indiquant le succès ou l'échec de l'insertion.
     */
FUNCTION ins_commande (
    p_client_id commande.client_id%TYPE,
    p_date_commande commande.date_commande%TYPE,
    p_prix_total commande.prix_total%TYPE,
    p_status VARCHAR2
) RETURN VARCHAR2;

 /**
     * Met à jour une commande existante.
     * @param p_commande_id ID de la commande à mettre à jour.
     * @param p_prix_total Nouveau prix total, ou NULL pour conserver l'actuel.
     * @param p_status Nouveau statut, ou NULL pour conserver l'actuel.
     * @return Message indiquant le succès ou l'échec de l'opération.
     */
FUNCTION upd_commande (
    p_commande_id commande.commande_id%TYPE,
    p_prix_total commande.prix_total%TYPE DEFAULT NULL,
    p_status commande.status%TYPE DEFAULT NULL
) RETURN VARCHAR2;

 /**
     * Supprime une commande de la table.
     * @param p_commande_id ID de la commande à supprimer.
     * @return Message indiquant le succès ou l'échec de l'opération.
     */
FUNCTION sup_commande (
    p_commande_id commande.commande_id%TYPE
) RETURN VARCHAR2;

  /**
     * Récupère une commande par son ID.
     * @return Un enregistrement de commande ou NULL si non trouvé.
     */
FUNCTION get_commande (
    p_commande_id commande.commande_id%TYPE
) RETURN commande_rec;
END commande_API;

