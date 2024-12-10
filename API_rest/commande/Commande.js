const apiUrl = "http://127.0.0.1:3030/commande";

async function lireCommande() {
    const id = document.getElementById("rechercheCommandeId").value;
    if (!id) {
        afficherMessage("Veuillez entrer un ID pour rechercher.");
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/${id}`);
        const data = await response.json();
        if (response.ok) {
            afficherMessage(`Commande trouvée : ${JSON.stringify(data)}`);
        } else {
            afficherMessage(`Erreur : ${data.message}`);
        }
    } catch (error) {
        afficherMessage(`Erreur lors de la recherche : ${error.message}`);
    }
}

async function creerCommande() {
    const dateCommande = document.getElementById("dateCommande").value;
    const montantTotal = document.getElementById("montantTotal").value;
    const etatCommande = document.getElementById("etatCommande").value;

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ dateCommande, montantTotal, etatCommande }),
        });
        const data = await response.json();
        afficherMessage(`Résultat : ${data.message || JSON.stringify(data)}`);
    } catch (error) {
        afficherMessage(`Erreur lors de la création : ${error.message}`);
    }
}

async function modifierCommande() {
    const id = document.getElementById("rechercheCommandeId").value;
    const montantTotal = document.getElementById("montantTotal").value;
    const etatCommande = document.getElementById("etatCommande").value;

    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ montantTotal, etatCommande }),
        });
        const data = await response.json();
        afficherMessage(`Résultat : ${data.message || JSON.stringify(data)}`);
    } catch (error) {
        afficherMessage(`Erreur lors de la modification : ${error.message}`);
    }
}

async function supprimerCommande() {
    const id = document.getElementById("rechercheCommandeId").value;

    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: "DELETE",
        });
        const data = await response.json();
        afficherMessage(`Résultat : ${data.message || JSON.stringify(data)}`);
    } catch (error) {
        afficherMessage(`Erreur lors de la suppression : ${error.message}`);
    }
}

function afficherMessage(message) {
    const resultat = document.getElementById("resultat");
    resultat.innerText = message;
}
