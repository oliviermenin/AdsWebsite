 Ce projet est une plateforme de petites annonces permettant aux particuliers de
 publier et de consulter des offres.
 Il est composé de deux parties : un frontend développé avec Next.js et un
 backend développé avec Symfony.
## Installation
 ### Frontend
 1. Naviguez dans le dossier du frontend :
   cd frontend
2. Installez les dépendances :
   npm install
 3. Lancez le serveur de développement :
   npm run dev
 4. Accédez à l'application frontend en visitant :
   http://localhost:3000
 ### Backend
 1. Naviguez dans le dossier du backend :
   cd backend
 2. Installez les dépendances :
   composer install
 3. Clés JWT :\
    -mkdir -p config/jwt\
    -openssl genpkey -algorithm RSA -out config/jwt/private.pem -pkeyopt rsa_keygen_bits:4096\
    -openssl rsa -pubout -in config/jwt/private.pem -out config/jwt/public.pem
 5. Modifiez la variable DATABASE_URL dans le fichier .env :\
  DATABASE_URL="mysql://app:!ChangeMe!@127.0.0.1:3306/db_Ads?serverVersion=8.0.40&charset=utf8mb4"\
  Adaptez les identifiants en fonction de votre configuration
 7. Lancez le serveur Symfony :
   symfony serve
 8. Accédez à l'API backend en visitant :
   http://localhost:8000
## Fonctionnalités
  - Interface utilisateur moderne et intuitive.
  - Affichage et recherche des annonces.
  - Publication d'annonces.
  - Inscription/Connexion
  - Gestion des utilisateurs et des annonces.
  - Authentification JWT.
  - API RESTful pour interagir avec le frontend.
