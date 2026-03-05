# Projet de base Node.js + Angular + SQL Server (Docker)

Structure créée :
- `backend/` : API Node.js (Express) et Dockerfile
- `frontend/` : squelette pour Angular (voir instructions)
- `docker-compose.yml` : configure SQL Server, backend et frontend

Prérequis :
- Docker et Docker Compose installés
- Si vous voulez un vrai projet Angular : `npx @angular/cli` ou `npm install -g @angular/cli`

Démarrage rapide (squelette fourni) :

1. Copier l'exemple d'environnement et ajuster les mots de passe :

```bash
cp .env.example .env
```

2. Construire et démarrer les services :

```bash
docker-compose up --build
```

Notes :
- Le dossier `frontend/` contient un Dockerfile pour servir une application construite. Pour créer une vraie app Angular, exécutez depuis le répertoire racine :

```bash
npx @angular/cli new frontend --directory frontend --routing=false --style=css
```

puis adaptez le `frontend/Dockerfile` si besoin.

Souhaitez-vous que je génère l'application Angular complète et lance `docker-compose up` pour tester ?
