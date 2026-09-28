# Tron -Jeu de course à deux joueurs

Deux joueurs s'affrontent et un seul repartira gagnant de la manche. Chaque moto laisse une trace derrière elle et le but 
du jeu est de survivre le plus longtemps possible sans faire de collisions. Les collisions peuvent se faire face première 
avec l'adversaire, avec les traces de l'adversaire ou nos propres traces alors il faut être vigilent. Pour accéder au jeu, 
il faut se connecter ou s'inscrire sur la page de connexion. 

## Tables des matières

- [Fonctionnalités](#-fonctionnalités)
- [Technologies utilisées](#-technologies-utilisées)
- [Installation](#-installation)
- [Comment jouer](#-comment-jouer)
- [Règles du jeu](#-règles-du-jeu)

---
## Fonctionnalités
- **Page de connexion** : l'utilisateur doit saisir son identifiant et son mot de passe avant d'accéder au jeu.
- **Mode deux joueurs** sur le même clavier.
- **Traces lumineuses** laissées par chaque moto tout au long de la partie.
- **Détection des collisions** entre les joueurs, avec les traces et avec les bords de la grille.
- **Difficulté progressive** : la vitesse du jeu augmente au fil de la partie.
  
---
## Technologies utilisées

- HTML5
- CSS3
- JavaScript

---
## Installations

### 1- CLoner le dépôt de github

git clone https://github.com/BarbaraEstimable/aec-developpement_application_web-tron.git

### 2- Ouvrir le dossier

cd aec-developpement_application_web-tron

### 3- Lancer le projet

Lancer connexion.html

---
## Comment jouer

### Connexion

Une page de connexion est affiché quand le jeu démarre, vous avez le choix de vous inscrire ou de vous connecter avec votre
**identitifiant** et votre **mot de passe**. Après vérification réussit de l'identifiant et du mot de passe, vous pourrez accéder au jeu.

### Commandes
 Déplacement  | Joueur 1 | Joueur 2 |
|-------------|:--------:|:--------:|
| Haut        | `W`      | `↑`      |
| Bas         | `S`      | `↓`      |
| Gauche      | `A`      | `←`      |
| Droite      | `D`      | `→`      |


---
## Règles du jeu

- Chaque joueur a une moto qui laisse des traces après son passage et qui avance en continu.
- Un joueur perd la partie s'il:
    - entre en contact directement avec l'autre joueur
    - touche la trace que son adversaire a laissé
    - touche sa propre trace
    - sort des limites de la grille

- Plus la partie avancera et plus la vitesse du jeu augmentera pour ajouter un niveau de difficulté. Vous auriez moins de temps pour prendre des décisions sur vos déplacements et augmente le risque de collisions. 

---
