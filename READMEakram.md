README de Mohamed-Akram Aymouch : comment déployer votre application en détail à partir de GitHub :

Première étape Récupération du projet depuis GitHub :
   - Clonez le dépôt avec la commande : `git clone <URL_DU_DEPOT>`
   - Accédez au dossier du projet : `cd <NOM_DU_REPERTOIRE>`

Deuxième étape Configuration du serveur API REST :
   - Accédez au répertoire `server` : `cd server`
   - Vérifiez les informations de connexion dans `dbconfig.mjs` (hôte, utilisateur, mot de passe, base de données).
   - Installez les dépendances : `npm install`
   - Lancez le serveur avec la commande : `node serveur-APIv3.js`

Troisième étape Lancer le client HTML :
   - Retournez dans le dossier principal du projet : `cd ..`
   - Accédez au dossier `client` : `cd client`
   - Ouvrez le fichier `client.html` dans VS Code et activez l'extension Live Preview.
   - Une URL sera générée. Ouvrez-la dans votre navigateur pour accéder à l'application.
