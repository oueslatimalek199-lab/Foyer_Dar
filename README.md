# 🏠 Foyer Dar

Plateforme web d'entraide pour les étudiants tunisiens : trouver un logement et un·e colocataire compatible quand on change de ville pour ses études.

## ✨ Fonctionnalités

- **Authentification** : inscription, connexion (JWT), réinitialisation du mot de passe par e-mail
- **Annonces** : publier un logement ou une recherche de colocation, filtres avancés (ville, prix, pièces, proximité faculté), favoris, signalement
- **Matching IA** : score de compatibilité (0–100 %) entre colocataires via un microservice Python (similarité cosinus sur budget, fumeur, rythme de vie, rythme d'étude, animaux)
- **Messagerie interne** et notifications
- **Espace administrateur** : modération des signalements, gestion des utilisateurs, gestion des villes universitaires
- **Tableau de bord BI** : loyer moyen par ville, ratio offre/demande, critères les plus recherchés, export CSV
- **Journal d'audit** des actions sensibles

## 🧱 Architecture

| Couche          | Technologies                                        |
| --------------- | --------------------------------------------------- |
| Frontend        | React, Vite                                         |
| Backend         | Node.js, Express, Mongoose, JWT, Multer, Nodemailer |
| Base de données | MongoDB                                             |
| Microservice IA | Python, FastAPI                                     |
| Déploiement     | Docker Compose, Nginx                               |

```
foyer-dar/
├── foyer-dar-backend/        # API REST (Node.js / Express)
├── foyer-dar-frontend/       # Interface React (Vite)
├── foyer-dar-ia-service/     # Microservice de matching (FastAPI)
├── docs/                     # Captures d'écran
├── docker-compose.yml
└── README.md
```

## 🚀 Lancer avec Docker (recommandé)

```bash
git clone https://github.com/oueslatimalek199-lab/NOM_DU_REPO.git
cd NOM_DU_REPO
cp backend/.env.example backend/.env   # puis remplir les valeurs
docker compose up --build
```

Application disponible sur http://localhost:18080

## 🛠️ Lancer en développement

**1. Backend**

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

**2. Microservice IA**

```bash
cd foyer-dar-ia-service
pip install -r requirements.txt
uvicorn main:app --port 8000
```

**3. Frontend**

```bash
cd foyer-dar-frontend
npm install
npm run dev
```

**4. Données de démo** (10 comptes + ~35 annonces)

```bash
cd backend
node seed.js
```

## 📸 Captures d'écran

| Accueil                      | Recommandations IA             |
| ---------------------------- | ------------------------------ |
| ![Accueil](docs/accueil.png) | ![Matching](docs/matching.png) |

| Messagerie                   | Dashboard BI       |
| ---------------------------- | ------------------ |
| ![Chat](docs/messagerie.png) | ![BI](docs/bi.png) |

## 🔐 Sécurité

Mots de passe hachés (bcrypt), authentification JWT, rôles (étudiant / admin), vérification de propriétaire sur les annonces, clé API entre le backend et le microservice IA, journal d'audit.

## 👩‍💻 Auteure

**Loulou** – Licence en Informatique de Gestion (BI), ISGS Sousse
GitHub : [oueslatimalek199-lab](https://github.com/oueslatimalek199-lab)
