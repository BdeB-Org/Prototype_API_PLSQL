document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("searchButton");
  const modifyButton = document.getElementById("modifyButton");
  const deleteButton = document.getElementById("deleteButton");
  const insertButton = document.getElementById("insertButton");
  const saveButton = document.getElementById("saveButton");
  const cancelButton = document.getElementById("cancelButton");
  const actionButtonsDiv = document.getElementById("actionButtons");
  const saveCancelButtonsDiv = document.getElementById("saveCancelButtons");
  const dialogSupprimer = document.getElementById("dialogSupprimer");
  const messagesDiv = document.getElementById("messages");
  const etatActionInput = document.getElementById("etatAction");
  const clientIdInput = document.getElementById("CLIENT_ID");
  const DUREE_MESSAGE = 5; // Durée des messages (en secondes)
  const HOST = "http://localhost:3010";

  initialiserFormulaire();

  // Initialiser le formulaire
  function initialiserFormulaire() {
    actionButtonsDiv.style.display = "block";
    saveCancelButtonsDiv.style.display = "none";
    initialiserChamps();
    desactiverChamps();
    deleteButton.disabled = true;
    modifyButton.disabled = true;
  }

  // Initialiser les champs du formulaire
  function initialiserChamps() {
    clientIdInput.value = "";
    document.getElementById("NOM").value = "";
    document.getElementById("PRENOM").value = "";
    document.getElementById("EMAIL").value = "";
    document.getElementById("TELEPHONE").value = "";
    document.getElementById("ADRESSE").value = "";
    etatActionInput.value = "";
  }

  // Désactiver les champs
  function desactiverChamps() {
    document.getElementById("NOM").disabled = true;
    document.getElementById("PRENOM").disabled = true;
    document.getElementById("EMAIL").disabled = true;
    document.getElementById("TELEPHONE").disabled = true;
    document.getElementById("ADRESSE").disabled = true;
  }

  // Activer les champs
  function activerChamps() {
    document.getElementById("NOM").disabled = false;
    document.getElementById("PRENOM").disabled = false;
    document.getElementById("EMAIL").disabled = false;
    document.getElementById("TELEPHONE").disabled = false;
    document.getElementById("ADRESSE").disabled = false;
  }

  // Afficher un message avec un compte à rebours
  function afficherMessage(message, temps, estErreur = false) {
    messagesDiv.style.color = estErreur ? "red" : "green";
    let compteur = temps;
    const intervalID = setInterval(() => {
      messagesDiv.textContent = `${message} ${compteur}..`;
      compteur--;
      if (compteur < 0) {
        clearInterval(intervalID);
        messagesDiv.textContent = "";
        if (!estErreur) initialiserFormulaire();
      }
    }, 1000);
  }

  // Gestionnaire pour le bouton "Rechercher"
  searchButton.addEventListener("click", function () {
    const clientId = clientIdInput.value;
    fetch(`${HOST}/clients/${clientId}`)
      .then((response) => {
        if (response.ok) return response.json();
        else throw new Error("Client non trouvé.");
      })
      .then((data) => {
        const client = JSON.parse(data);
        document.getElementById("NOM").value = client.NOM;
        document.getElementById("PRENOM").value = client.PRENOM;
        document.getElementById("EMAIL").value = client.EMAIL;
        document.getElementById("TELEPHONE").value = client.TELEPHONE;
        document.getElementById("ADRESSE").value = client.ADRESSE;
        desactiverChamps();
        modifyButton.disabled = false;
        deleteButton.disabled = false;
      })
      .catch(() => afficherMessage("Client non trouvé.", DUREE_MESSAGE, true));
  });

  // Gestionnaire pour le bouton "Modifier"
  modifyButton.addEventListener("click", function () {
    saveCancelButtonsDiv.style.display = "block";
    actionButtonsDiv.style.display = "none";
    etatActionInput.value = "modifier";
    activerChamps();
  });

  // Gestionnaire pour le bouton "Supprimer"
  deleteButton.addEventListener("click", function () {
    dialogSupprimer.showModal();
  });

  // Gestionnaire pour le bouton "Insérer"
  insertButton.addEventListener("click", function () {
    saveCancelButtonsDiv.style.display = "block";
    actionButtonsDiv.style.display = "none";
    initialiserChamps();
    etatActionInput.value = "inserer";
    activerChamps();
  });

  // Gestionnaire pour le bouton "Annuler"
  cancelButton.addEventListener("click", function () {
    initialiserFormulaire();
  });

  // Gestionnaire pour le bouton "Sauvegarder"
  saveButton.addEventListener("click", function () {
    const client = {
      NOM: document.getElementById("NOM").value,
      PRENOM: document.getElementById("PRENOM").value,
      EMAIL: document.getElementById("EMAIL").value,
      TELEPHONE: document.getElementById("TELEPHONE").value,
      ADRESSE: document.getElementById("ADRESSE").value,
    };

    const method = etatActionInput.value === "inserer" ? "POST" : "PUT";
    const url =
      method === "POST"
        ? `${HOST}/clients`
        : `${HOST}/clients/${clientIdInput.value}`;

    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(client),
    })
      .then((response) => {
        if (response.ok) afficherMessage("Enregistrement réussi.", DUREE_MESSAGE);
        else throw new Error("Erreur lors de l'enregistrement.");
      })
      .catch(() =>
        afficherMessage("Erreur lors de l'enregistrement.", DUREE_MESSAGE, true)
      );
  });

  // Gestionnaire pour confirmer la suppression
  dialogSupprimer.addEventListener("close", function () {
    if (dialogSupprimer.returnValue === "oui") {
      const clientId = clientIdInput.value;
      fetch(`${HOST}/clients/${clientId}`, { method: "DELETE" })
        .then((response) => {
          if (response.ok) afficherMessage("Suppression réussie.", DUREE_MESSAGE);
          else throw new Error("Erreur lors de la suppression.");
        })
        .catch(() =>
          afficherMessage("Erreur lors de la suppression.", DUREE_MESSAGE, true)
        );
    }
  });
});
