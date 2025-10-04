# 📱 EXPRESS_MONGO-MAIN

## 🚀 Description
**EXPRESS_MONGO-MAIN** est une **API REST** construite avec **Node.js**, **Express** et **MongoDB** (via Mongoose).  
Elle permet de gérer une collection de **smartphones** avec un **CRUD complet** et un **ID auto-incrémenté**.  

Le projet inclut un **middleware de sécurité** pour protéger la suppression de données sensibles.

---

## 📂 Structure du projet

mon-projet-express/
│── controllers/
│ └── smartphoneController.js
│
│── middleware/
│ └── checkCode.js
│
│── models/
│ └── smartphone.js
│
│── routes/
│ └── smartphoneRoutes.js
│
│── public/
│ └── images/
│
│── src/
│ ├── assets/
│ ├── components/
│ └── main.jsx
│
│── app.js
│── connectdb.js
│── .env
│── package.json
│── README.md

yaml
Copier le code

---

## ⚙️ Installation

1. Cloner le projet :  
```bash
git clone https://github.com/ton-compte/EXPRESS_MONGO-MAIN.git
cd EXPRESS_MONGO-MAIN
Installer les dépendances :

bash
Copier le code
npm install
Créer un fichier .env à la racine :

ini
Copier le code
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/smartphoneDB
DELETE_CODE=123
Pour MongoDB Atlas, remplace MONGO_URI par ton URI en ligne.

Lancer le serveur :

bash
Copier le code
npm start   # production
npm run dev # développement avec nodemon
Le serveur sera accessible sur http://localhost:5000.

🔗 Endpoints API
Méthode	Endpoint	Description
POST	/api/smartphones	Ajouter un smartphone
GET	/api/smartphones	Récupérer tous les smartphones
GET	/api/smartphones/:id	Récupérer un smartphone par ID
PUT	/api/smartphones/:id	Mettre à jour un smartphone
DELETE	/api/smartphones/:id	Supprimer un smartphone (code requis)

📄 Exemple JSON pour POST / PUT
json
Copier le code
{
  "nom": "iPhone 15 Pro",
  "marque": "Apple",
  "prix": 1299,
  "description": "Le dernier iPhone avec puce A17",
  "caracteristiques": {
    "ram": "8 Go",
    "rom": "256 Go",
    "ecran": "6.1 pouces OLED"
  },
  "photos": ["image1.jpg", "image2.jpg"],
  "couleurs": ["Noir", "Argent", "Bleu"]
}
nom, marque, prix sont obligatoires

description, caracteristiques, photos, couleurs sont optionnels

🔐 Suppression sécurisée (DELETE)
Pour supprimer un smartphone, le middleware checkCode exige un header x-delete-code :

http
Copier le code
DELETE /api/smartphones/1
x-delete-code: 123
Code absent → 403 Forbidden

Code incorrect → 401 Unauthorized

💻 Exemples avec curl
Ajouter un smartphone :

bash
Copier le code
curl -X POST http://localhost:5000/api/smartphones \
-H "Content-Type: application/json" \
-d '{"nom":"Galaxy S24","marque":"Samsung","prix":999}'
Récupérer tous les smartphones :

bash
Copier le code
curl http://localhost:5000/api/smartphones
Récupérer un smartphone par ID :

bash
Copier le code
curl http://localhost:5000/api/smartphones/1
Mettre à jour un smartphone :

bash
Copier le code
curl -X PUT http://localhost:5000/api/smartphones/1 \
-H "Content-Type: application/json" \
-d '{"prix":1099}'
Supprimer un smartphone :

bash
Copier le code
curl -X DELETE http://localhost:5000/api/smartphones/1 \
-H "x-delete-code: 123"
🛠️ Stack technique
Backend : Node.js, Express

Base de données : MongoDB + Mongoose

Middleware : checkCode pour sécuriser DELETE

Frontend : React + Vite (optionnel)

✅ Commandes utiles
bash
Copier le code
npm install       # installer les dépendances
npm start         # lancer le serveur
npm run dev       # lancer le serveur avec nodemon
📚 Notes pour débutants
L'ID est auto-incrémenté pour chaque smartphone.

Assurez-vous que MongoDB tourne avant de lancer le serveur.

Les routes sont sous /api (ex : /api/smartphones).

Le header x-delete-code est obligatoire pour supprimer un smartphone.

🌟 Bonus
Possibilité d’intégrer un frontend React pour interagir avec l’API.

Facile à étendre pour ajouter authentification, pagination, ou filtres avancés.

📌 Conclusion
Ce projet est parfait pour apprendre :

Les opérations CRUD avec Express et MongoDB

La sécurisation d’API via middleware

La structuration d’un projet Node.js moderne

L’intégration avec un frontend React ou Vite
