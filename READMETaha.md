Étape 1 : Récupération du projet depuis GitHub

    Clonez le dépôt avec la commande suivante :

git clone <URL_DU_DEPOT>

Accédez au dossier du projet :

    cd <NOM_DU_REPERTOIRE>

Étape 2 : Configuration du serveur API REST

    Accédez au répertoire server :

cd server

Vérifiez et configurez les informations de connexion dans le fichier dbconfig_commande.mjs (hôte, utilisateur, mot de passe, base de données).
Installez les dépendances requises :

npm install

Lancez le serveur API avec la commande :

    node serveur_commande.js

Étape 3 : Lancer le client HTML

    Retournez au dossier principal du projet :

cd ..

Accédez au répertoire client :

cd client

Ouvrez le fichier Commande.html dans VS Code.
Activez l'extension Live Preview pour démarrer le client.
Une URL sera générée dans l'onglet de prévisualisation de VS Code.
Copiez l'URL générée et ouvrez-la dans votre navigateur pour accéder à l'application.