# Bienvenue dans la partie API de Colis&Co

## Stack technique

* NodeJS
* PostgreSQL
* Sqitch
* Git

Marche à suivre pour l'installation de l'API

## Installation

Ouvrez un terminal à la racine du projet

Se rendre dans le dossier back
```
$ cd back 
```

Installez les dépendances NPM
```
$ npm install
```

Créer une base de données PostgreSQL et déployer avec sqitch
```
$ createdb [nom de la Database]
$ sqitch deploy
```
:triangular_flag_on_post: Configurer PostgreSQL (ou fournir les variables d'environnement nécessaires à la connexion) pour que les commandes creatdb et sqitch puissent s'éxécuter correctement

## Insertion des données

Lancer la commande :
```
$ node data/import.js
```

## Lancement

```
$ npm run start
```





