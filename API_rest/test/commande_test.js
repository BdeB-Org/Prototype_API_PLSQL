import request from 'supertest';
import assert from 'assert';

const API_URL = 'http://127.0.0.1:3030'; // Adresse de votre API REST

describe('API Commande Tests', () => {

    // Test de création d'une commande
    it('Créer une commande', async () => {
        const commandeData = {
            date_commande: '2024-12-10',
            prix_total: 100.50,
            status: 'En attente'
        };

        const response = await request(API_URL)
            .post('/commande')
            .send(commandeData)
            .set('Accept', 'application/json');

        assert.strictEqual(response.status, 201, 'Code HTTP incorrect');
        assert.strictEqual(response.body.status, 'success', 'Statut de la réponse incorrect');
        assert.ok(response.body.data.commande_id, 'Commande ID manquant dans la réponse');
    });

    // Test de lecture d'une commande
    it('Lire une commande existante', async () => {
        const commandeId = 1; // Remplacez par un ID valide dans votre base de données

        const response = await request(API_URL)
            .get(`/commande/${commandeId}`)
            .set('Accept', 'application/json');

        assert.strictEqual(response.status, 200, 'Code HTTP incorrect');
        assert.strictEqual(response.body.status, 'success', 'Statut de la réponse incorrect');
        assert.strictEqual(response.body.data.commande_id, commandeId, 'Commande ID incorrect');
    });

    // Test de mise à jour d'une commande
    it('Mettre à jour une commande', async () => {
        const commandeId = 1; // Remplacez par un ID valide dans votre base de données
        const updatedData = {
            prix_total: 200.75,
            status: 'En cours'
        };

        const response = await request(API_URL)
            .put(`/commande/${commandeId}`)
            .send(updatedData)
            .set('Accept', 'application/json');

        assert.strictEqual(response.status, 200, 'Code HTTP incorrect');
        assert.strictEqual(response.body.status, 'success', 'Statut de la réponse incorrect');
        assert.strictEqual(response.body.data.nbre_rangee, 1, 'Aucune ligne mise à jour');
    });

    // Test de suppression d'une commande
    it('Supprimer une commande', async () => {
        const commandeId = 1; // Remplacez par un ID valide dans votre base de données

        const response = await request(API_URL)
            .delete(`/commande/${commandeId}`)
            .set('Accept', 'application/json');

        assert.strictEqual(response.status, 200, 'Code HTTP incorrect');
        assert.strictEqual(response.body.status, 'success', 'Statut de la réponse incorrect');
        assert.strictEqual(response.body.data.nbre_rangee, 1, 'Aucune ligne supprimée');
    });

    // Test pour une commande inexistante
    it('Lire une commande inexistante', async () => {
        const commandeId = 9999; // ID inexistant

        const response = await request(API_URL)
            .get(`/commande/${commandeId}`)
            .set('Accept', 'application/json');

        assert.strictEqual(response.status, 404, 'Code HTTP incorrect pour une commande inexistante');
        assert.strictEqual(response.body.status, 'error', 'Statut de la réponse incorrect');
        assert.strictEqual(response.body.message, 'Commande non trouvée', 'Message incorrect pour commande inexistante');
    });
});
