'use strict';   // Mode strict du JavaScript

/*************************************************************************************************/
/* **************************************** DONNEES JEU **************************************** */
/*************************************************************************************************/
const LEVEL_EASY = 0,
    LEVEL_NORMAL = 1,
    LEVEL_HARD = 2,

    PLAYER_MAGE = 0,
    PLAYER_CHEVALIER = 1,
    PLAYER_VOLEUR = 2;

    

let game = new Object();
    game.level = 0;
    game.userPlayer = 0;
    game.playerName;
    game.pvDragon = 100;
    game.pvDragonInit = 0;
    game.pvUser = 100;
    game.pvUserInit = 0;
    game.turn = 0;
    game.tirageDragon;
    game.tirageUser;
    game.pointsDomage;
    game.bonusPlayer;


////VARIABLES POUR RECOUPERER LES ELEMENTS DOM

let	dom = new Object ();
	dom.form = document.querySelector('#optionsForm');
	dom.playerName = dom.form.querySelector('#playerName');
	dom.level = dom.form.querySelector('#gameLevel');
	dom.gamePlayer = dom.form.querySelector('#gamePlayer');
	dom.play = dom.form.querySelector('#play');

	

/*************************************************************************************************/
/* *************************************** CONFIG  *************************************** */
/*************************************************************************************************/


dom.play.addEventListener('click', play);                   //EVENEMENT CLICK BUTTOM

function play(){
    game.playerName = dom.playerName.value;
	game.level = dom.level.selectedIndex;
    game.userPlayer = dom.gamePlayer.selectedIndex;
    
    dom.form.style.display = "none";                ///KILL THE  FORM

    console.log(game.playerName);
    console.log(game.level);
    console.log(game.userPlayer);

       
    initGame();
    playGame();
    endGame();

}





/*************************************************************************************************/
/* *************************************** FONCTIONS JEU *************************************** */
/*************************************************************************************************/
//Préparation du jeu
function initGame(){

    switch (game.level){
        case LEVEL_EASY:
            game.pvDragon += (tirageDes(10,10));
            console.log(game.pvDragon);
            game.pvUser += (tirageDes(10,10));
        break;
        case LEVEL_NORMAL:
            game.pvDragon += (tirageDes(10,10));
            game.pvUser += (tirageDes(10,10));
        break;
        case LEVEL_HARD:
            game.pvDragon += (tirageDes(10,10));
            game.pvUser += (tirageDes(7,10));
        break;
    }
    game.pvUserInit = game.pvUser;                      //STOCK DES POINT DE DEPART POUR LES COMPARES APRES <30%
    game.pvDragonInit = game.pvDragon;
    console.log(game.pvDragon, game.pvUser);
    writeGameState();
}


    
/////play the game

function playGame(){
    
    ///determiner le plus rapide
    while (game.pvDragon > 0 && game.pvUser > 0){    

        game.tirageDragon = tirageDes(10,6); 
        game.tirageUser  = tirageDes(10,6);

        ///bonus player
        bonusPlayerInititive();
        
        ////ATTACK
        if(game.tirageDragon > game.tirageUser){               /// si Dragon 
            game.pointsDomage = tirageDes(3,6);
            levelBonus();                                       //level bobu
            bonusPlayerAttackDragon();                               //player bonus
            game.pvUser -= game.pointsDomage;
            
        } else {                                                ///si user
            game.pointsDomage  = tirageDes(3,6);
            levelBonus(); 
            bonusPlayerAttackUser();               
            game.pvDragon -= game.pointsDomage;
            
        } 
        game.turn++;
       
       
        ///show journal
        writeTurn()
        writeGameState()

       ///TESTS     
        console.log('turn' + game.turn);
        console.log('tir user' + game.tirageUser);
        console.log('tir drag' + game.tirageDragon);
        console.log('p doma' + game.pointsDomage);
        console.log('pv drag' + game.pvDragon);
        console.log('pv user' + game.pvUser);
    }   
  
}

function endGame(){
    if (game.pvDragon > game.pvUser){
        console.log('dragon win');
        document.write('<li class="game-end"><p class="title">Fin de la partie</p><p>Vous avez perdu le combat, le dragon vous a carbonisé !</p><img src="images/dragon-winner.png" alt="Dragon"></li>');
    }else{
        console.log('user win');
        document.write('<li class="game-end"><p class="title">Fin de la partie</p><p>YOU WIN !</p><img src="images/knight-winner.png" alt="Chevalier"></li>');
    }
}




/*************************************************************************************************/
/* ************************************** CODE PRINCIPAL *************************************** */
/*************************************************************************************************/

//initGame();
//playGame();
//endGame();


