Exemple de microservices créés en Node.js (Communication synchrone):

- Soit une simple partie d’application e-commerce gérant les produits et leurs commandes.
- L’application sera décomposée, dans un premier temps, en deux microservices : produit et commande.
- Chaque service aura sa propre base de données sous MongoDB.
- Les deux services seront considérés comme deux applications séparées, chacune expose son API et écoute sur son propre port.

---

1. Produit-service :

   a. Sous le dossier `produit-service`, ouvrir le terminal et exécuter les commandes suivantes :

   ```shell
   npm init
   npm install express mongoose nodemon
   ```

   b. Ajouter à la racine de ce dossier un fichier vide `index.js`.

2. Commande-service :

   a. Sous le dossier `commande-service`, ouvrir le terminal et exécuter les commandes suivantes :

   ```shell
   npm init
   npm install express mongoose nodemon
   ```

   b. Ajouter à la racine de ce dossier un fichier vide `index.js`.

   c. Pour utiliser Axios, il faut tout d’abord l’installer via la commande :

   ```shell
   npm i axios
   ```
