
 /* =========================================
       CONSTANTES GLOBALES
       ========================================= */
    const CELL_SIZE = 5;
    const CELL_EMPTY = 0;
    const CELL_OCCUPIED_PLAYER1 = 1; // cas 6
    const CELL_OCCUPIED_PLAYER2 = 2; // cas 6
    const VITESSE_MAX = 30; // cas 10
    const ACCELERATION = 1.5; // cas 10
    const VITESSE_DEBUT = 130; // cas 10

    var scorePlayer1 = 0; // cas 5
    var scorePlayer2 = 0; // cas 5
    let game;
    let vitesseTron = VITESSE_DEBUT;
    let color1; // cas 6
    let color2; // cas 6

    
    /* =========================================
       CLASSE LIGHTCYCLE
       Rôle : Gère la moto, sa position et son mouvement
       ========================================= */
    class LightCycle {
        constructor(startX, startY, color, controls) {
            this.x = startX;
            this.y = startY;
            this.color = color;
            this.vx = 0;
            this.vy = -1; // Commence vers le haut
            this.alive = true;
            this.score1 = scorePlayer1; // cas 5
            this.score2 = scorePlayer2; // cas 5

            
            // Assignation des touches (ex: {up: 38, down: 40...})
            this.controls = controls; 
        }

        // Met à jour la direction selon la touche appuyée
        changeDirection(keyCode) {
            if (!this.alive) return;

            if (keyCode === this.controls.up && this.vy === 0) {
                this.vx = 0; this.vy = -1;
            } else if (keyCode === this.controls.down && this.vy === 0) {
                this.vx = 0; this.vy = 1;
            } else if (keyCode === this.controls.left && this.vx === 0) {
                this.vx = -1; this.vy = 0;
            } else if (keyCode === this.controls.right && this.vx === 0) {
                this.vx = 1; this.vy = 0;
            }
        }

        // Calcule la prochaine position
        getNextPosition() {
            return {
                x: this.x + this.vx,
                y: this.y + this.vy
            };
        }

        // Applique le mouvement
        move(newX, newY) {
            this.x = newX;
            this.y = newY;
        }

        die() {
            this.alive = false;
        }

        draw(ctx, xOffset, yOffset) {
            ctx.fillStyle = this.alive ? "#ffffff" : "#555555";
            // On dessine la tête de la moto
            ctx.fillRect(
                xOffset + this.x * CELL_SIZE, 
                yOffset + this.y * CELL_SIZE, 
                CELL_SIZE, 
                CELL_SIZE
            );
        }
    }
        

    /* =========================================
       CLASSE TRONGAME
       Rôle : Gère le moteur du jeu, la grille et le rendu
       ========================================= */
    class TronGame {
        constructor(canvasId) {
            this.canvas = document.getElementById(canvasId);
            this.ctx = this.canvas.getContext("2d");
            this.intervalle;
            
            // Calculs de la grille
            this.cols = this.canvas.width / CELL_SIZE;
            this.rows = this.canvas.height / CELL_SIZE;
            this.x0 = (this.canvas.width - this.cols * CELL_SIZE) / 2;
            this.y0 = (this.canvas.height - this.rows * CELL_SIZE) / 2;

            // gérer les déplacements avec la souris pour le Player 1
            this.player1_x0;
            this.player1_y0;
            this.player1_x1;
            this.player1_y1;

            // fin de partie (GAME OVER)
            this.isGameOver = false;

            // Gagnant
            this.winner;
            this.winnerOfTron;


            // Initialisation de la grille
            this.grid = this.createGrid();

            // Création du joueur (Au centre, un peu en bas)
            this.player1 = new LightCycle(
                this.cols / 2, 
                this.rows - 2, 
                "#ffffff",
                { up: 38, down: 40, left: 37, right: 39 } // Flèches directionnelles
            );

            // Cas 3: Création du deuxième joueur (En haut de la zone de jeu)
            this.player2 = new LightCycle(
                this.cols / 2, 
                this.rows  -150, 
                "#fa09fa",
                { up: 87, down: 83, left: 65, right: 68 } // W: 87, A: 65, S: 83, D: 68
            );
            // Cas 3
            this.player2.vy = 1; // Commence vers le haut

            // Cas 3 et cas 6
            // Marquer la position de départ comme occupée
            this.grid[this.player1.x][this.player1.y] = CELL_OCCUPIED_PLAYER1;
            this.grid[this.player2.x][this.player2.y] = CELL_OCCUPIED_PLAYER2;

            // Lier les événements (bind pour garder le contexte 'this')
            document.addEventListener('keydown', (e) => this.handleInput(e));

            // cas 8
            this.canvas.addEventListener('mousedown', (e) => this.mouseDown(e));
            this.canvas.addEventListener('mouseup', (e) => this.mouseUp(e));
        }

        createGrid() {
            let arr = [];
            for (let c = 0; c < this.cols; c++) {
                arr[c] = new Array(this.rows).fill(CELL_EMPTY);
            }
            return arr;
        }

        handleInput(e) {
            // Délègue la gestion de la direction au joueur concerné
            this.player1.changeDirection(e.keyCode);
            this.player2.changeDirection(e.keyCode);
        }

        // cas 8
        mouseDown(e){
            this.player1_x0 = e.clientX
            this.player1_y0 = e.clientY
        }

        // cas 8
        mouseUp(e){
            if (!this.player1.alive) return;
            this.player1_x1 = e.clientX
            this.player1_y1 = e.clientY

            let delta_x = this.player1_x1 - this.player1_x0;
            let delta_y = this.player1_y1 - this.player1_y0;

            if (Math.abs(delta_x) > Math.abs(delta_y)){
                if (delta_x > 0){
                    this.player1.changeDirection(this.player1.controls.right);  // glissement a droite
                    console.log("Glissement de la souris vers la droite")
                }else{
                    this.player1.changeDirection(this.player1.controls.left);  // glissement a gauche
                    console.log("Glissement de la souris vers la gauche")
                }
            } else{
                if (delta_y > 0){
                    this.player1.changeDirection(this.player1.controls.down);  // glissement en bas
                    console.log("Glissement de la souris vers le bas")
                } else{
                    this.player1.changeDirection(this.player1.controls.up);  // glissement en haut
                    console.log("Glissement de la souris vers le haut")
                }   
            }
        }

        // Personnalisation
        gameOver(){
                // GAME OVER
                this.ctx.textAlign = "center";
                this.ctx.fillStyle = "black";
                this.ctx.font = "120px Impact";
                this.ctx.fillText("GAME OVER!", this.canvas.width / 2, this.canvas.height / 2);

                // Gagnant du tour
                this.ctx.fillStyle = "green";
                this.ctx.font = "50px Arial";
                this.ctx.fillText("WINNER : " + this.winner, this.canvas.width / 2, this.canvas.height / 2 + 120);

                // Gagnant final
                if(scorePlayer1 === 3 || scorePlayer2 === 3){
                this.ctx.fillStyle = "red";
                this.ctx.font = "55px Impact";
                this.ctx.fillText("WINNER OF TRON GAME : " + this.winnerOfTron, this.canvas.width / 2, this.canvas.height / 2 - 80);
                }
        }
        // cas 4 et cas 5
        stop() {
            // Boucle arrêt du jeu
            clearTimeout(this.intervalle);
            //this.intervalle = null; // Pour dire au jeu d'arrêter de fonctionner complètement
            this.isGameOver= true;
            
        }

        // modifié pour les cas 3, cas 4, cas 5 et cas 10
        update() {
            if (!this.player1.alive || !this.player2.alive ) return;

            const nextPos1 = this.player1.getNextPosition();
            const nextPos2 = this.player2.getNextPosition();

            
            if (vitesseTron > VITESSE_MAX){
                vitesseTron -= ACCELERATION;
                vitesseTron = Math.max(VITESSE_MAX, vitesseTron);
            }
            console.log(vitesseTron);
            

            if(this.checkCollision(nextPos1.x, nextPos1.y) && this.checkCollision(nextPos2.x, nextPos2.y)){
                this.player1.die();
                this.player2.die();
                console.log("Match Nul");
                this.winner = "DRAW"
                this.stop();

            }
            // Vérification des collisions (Murs OU Trace)
            else if (this.checkCollision(nextPos1.x, nextPos1.y)) {
                this.player1.die();
                scorePlayer2++;
                if (scorePlayer2 === 3){
                    this.winnerOfTron = "PLAYER 2"
                }
                console.log("Game Over!!");
                console.log("Winner Player 2!!");
                this.winner = "PLAYER 2"
                this.stop();

            } else if(this.checkCollision(nextPos2.x, nextPos2.y)) {
                this.player2.die();
                scorePlayer1++;
                if (scorePlayer1 === 3){    
                    this.winnerOfTron = "PLAYER 1"
                }
                console.log("Game Over!!");
                console.log("Winner Player 1!!");
                this.winner = "PLAYER 1"
                this.stop();

            } else {
                // Si pas de collision, on avance et on marque la grille
                this.grid[nextPos1.x][nextPos1.y] = CELL_OCCUPIED_PLAYER1;
                this.player1.move(nextPos1.x, nextPos1.y);
                this.grid[nextPos2.x][nextPos2.y] = CELL_OCCUPIED_PLAYER2;
                this.player2.move(nextPos2.x, nextPos2.y);
            }
        }

        // cas 6
        checkCollision(x, y) {
            // 1. Sortie de l'écran
            if (x < 0 || x >= this.cols || y < 0 || y >= this.rows) return true;
            // 2. Cellule déjà occupée
            if (this.grid[x][y] === CELL_OCCUPIED_PLAYER1 || this.grid[x][y] ===CELL_OCCUPIED_PLAYER2) return true;
            
            return false;
        }

        // modifié pour le cas 6
        draw() {
            // Note: Pour optimiser Tron, on ne devrait pas effacer tout l'écran à chaque fois,
            // mais pour cet exercice, on garde la logique de redessiner la grille.
            
            // Fond
            this.ctx.fillStyle = "#008CFF"; // Couleur de fond originale
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            // Dessiner les murs/traces existants

            for (let i = 0; i < this.cols; i++) {
                for (let j = 0; j < this.rows; j++) {
                    if (this.grid[i][j] === CELL_OCCUPIED_PLAYER1) {
                        this.ctx.fillStyle = color1; // Couleur des traces
                        this.ctx.fillRect(
                            this.x0 + i * CELL_SIZE + 1, 
                            this.y0 + j * CELL_SIZE + 1, 
                            CELL_SIZE - 2, 
                            CELL_SIZE - 2
                        );
                    } else if (this.grid[i][j] === CELL_OCCUPIED_PLAYER2) {
                        this.ctx.fillStyle = color2; // Couleur des traces
                        this.ctx.fillRect(
                            this.x0 + i * CELL_SIZE + 1, 
                            this.y0 + j * CELL_SIZE + 1, 
                            CELL_SIZE - 2, 
                            CELL_SIZE - 2
                        );
                    }
                }
            }

            // cas 5
            this.ctx.textBaseline = "top";
            this.ctx.textAlign = "left";
            this.ctx.font = "20px Arial"
            this.ctx.fillStyle = "black";
            this.ctx.fillText("Score Player 1: " + scorePlayer1, 20, 20);
            this.ctx.fillText("Score Player 2: " + scorePlayer2, 20, 40);
            
            

            // Dessiner les joueurs
            this.player1.draw(this.ctx, this.x0, this.y0);
            this.player2.draw(this.ctx, this.x0, this.y0);

            // Personnalisation: Fin de jeu (GAME OVER)
            if(this.isGameOver){
                this.gameOver();
            }

        }

        // modifié pour le cas 9 et le cas 10
        start() {
            if (this.isGameOver) return;
            this.update();
            this.draw();
            console.log("le jeu tourne");
            
            // Boucle de jeu
            this.intervalle= setTimeout(() => {
                this.start();
            }, vitesseTron);
        }
        pause(){
            clearTimeout(this.intervalle);
        
            //this.intervalle = null; // Pour dire au jeu d'arrêter de fonctionner complètement
        }


    }

 window.onload = function(){

    color1 = document.getElementById("color1").value;
    color2 = document.getElementById("color2").value;
    
    game = new TronGame("myCanvas");
    // Lancement du jeu
    console.log(color1);
    console.log(color2);
    game.start();


}

// cas 6
function changeColor1(){
    color1 = document.getElementById("color1").value;
}

// cas 6
function changeColor2(){
    color2 = document.getElementById("color2").value;
}

// Personalisation: musique
function playMusic(){
    var audio = document.getElementById("audio-file");
    audio.play();
}

function stopMusic(){
    var audio = document.getElementById("audio-file");
    audio.pause();
}

// cas 7: bouton start
function startGame(){
    //if(game.intervalle != null) return;
    game.start();
}

// cas 7: bouton pause
function pauseGame(){
    game.pause();
}

// cas 7: bouton restart
function restartGame(){
    game.stop();
    game = new TronGame("myCanvas");
    vitesseTron = VITESSE_DEBUT;
    game.start();
}




