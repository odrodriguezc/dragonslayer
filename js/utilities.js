'use strict';   // Mode strict du JavaScript


// game.userState30Plus = '<li class="game-state"><figure><img src="images/knight.png" alt="Chevalier"><figcaption>' + game.pvUser + ' PV ' + '<meter id="progression" value="' + game.pvUser + '" max="' + game.pvUserInit + '"></meter> </figcaption></figure>';

// game.userState30Moins = '<li class="game-state"><figure><img src="images/knight-wounded.png" alt="Chevalier"><figcaption>' + game.pvUser + ' PV ' + '<meter id="progression" value="' + game.pvUser + '" max="' + game.pvUserInit + '"></meter> </figcaption></figure>';

// game.dragonState30Plus = '<li class="game-state"><figure><img src="images/dragon.png" alt="Chevalier"><figcaption>' + game.pvDragon + ' PV ' + '<meter id="progression" value="' + game.pvDragon + '" max="' + game.pvDragonInit + '"></meter> </figcaption></figure></li>';

// game.dragonState30Moins = '<li class="game-state"><figure><img src="images/dragon-wounded.png" alt="Chevalier"><figcaption>' + game.pvDragon + ' PV ' + '<meter id="progression" value="' + game.pvDragon + '" max="' + game.pvDragonInit + '"></meter> </figcaption></figure></li>';








/*************************************************************************************************/
/* *********************************** FONCTIONS UTILITAIRES *********************************** */
/*************************************************************************************************/

//Obtenir un entier aléatoire dans un intervalle fermé

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
}

///TIRAGE DES

function tirageDes(tirages, faces){
    let score=0;
    for (let i = 0; i <= tirages; i++){
        score =  score + getRandomIntInclusive(1, faces);
    }
    // console.log(score);
    return score;    
}

////FONCTION LEVEL BONUS
function levelBonus(){   
    if (game.tirageDragon > game.tirageUser){
        switch (game.level){
            case LEVEL_EASY:
                game.pointsDomage -= Math.round((tirageDes(2,6)*0.06));
                break;
            case LEVEL_HARD:
                game.pointsDomage += Math.round((tirageDes(1,6)*0.06)); 
                break;   
            default:
                game.pointsDomage = game.pointsDomage;
        }
    } else{
        switch (game.level){
            case LEVEL_EASY:
                game.pointsDomage += Math.round((tirageDes(2,6)*0.06));
                break;
            case LEVEL_HARD:
                game.pointsDomage -= Math.round((tirageDes(1,6)*0.06)); 
                break;   
            default:
                game.pointsDomage = game.pointsDomage;
        }
    }
        
}

///BONUS PLAYER INITIATIVE

function bonusPlayerInititive(){
    switch (game.userPlayer){
        case PLAYER_MAGE:
            game.tirageUser += Math.round((tirageDes(1,6)*0.06));
        break;
        default:
            game.tirageUser += 0;
    }
}


///BONUS PLAYER ATTACK DRAGON
function bonusPlayerAttackDragon(){
    switch (game.userPlayer){
        case PLAYER_MAGE:
            game.pointsDomage += 0;
        break;
        case PLAYER_CHEVALIER:
            game.pointsDomage -= Math.round((tirageDes(1,10)*0.10)); //// atack aminore
        break;
        case PLAYER_VOLEUR:
            game.pointsDomage += 0;
        break;
    }
}

///BONUS PLAYER ATTACK USER
function bonusPlayerAttackUser(){
    switch (game.userPlayer){
        case PLAYER_MAGE:
            game.pointsDomage += Math.round((tirageDes(1,10)*0.10));
        break;
        case PLAYER_CHEVALIER:
            game.pointsDomage += 0;
        break;
        case PLAYER_VOLEUR:
            game.pointsDomage += 0;
        break;
    }
}


////WRITERS FUNCTIONS

function writeGameState(){
    if (game.pvUser > (game.pvUserInit * 0.30)){                                             //TEST DU 30% DES PV POUR DETERMINER L'IMAGE A AFICHER                                
        document.write('<li class="game-state"><figure><img src="images/knight.png" alt="Chevalier"><figcaption> <p>' + game.pvUser + ' PV </p><meter id="progression" min="0" max="' + game.pvUserInit + '" low="' + game.pvUserInit*0.3 + ' " high="' + game.pvUserInit*0.85 + '" value="' + game.pvUser + '"></meter> </figcaption></figure>');  
    } else{
        document.write('<li class="game-state"><figure><img src="images/knight-wounded.png" alt="Chevalier"><figcaption><p>' + game.pvUser + ' PV </p><meter id="progression" min="0" max="' + game.pvUserInit + '" low="' + game.pvUserInit*0.3 + ' " high=" ' + game.pvUserInit*0.85 + '" value="' + game.pvUser + '"></meter> </figcaption></figure>');      
    } 

    if (game.pvDragon > (game.pvDragonInit * 0.30)){
        document.write('<li class="game-state"><figure><img src="images/dragon.png" alt="Chevalier"><figcaption> <p>' + game.pvDragon + ' PV </p> <meter id="progression" min="0" max="' + game.pvUserInit + '" low="' + game.pvUserInit*0.3 + ' " high="' + game.pvUserInit*0.85 + '" value="' + game.pvUser + '"></meter> </figcaption></figure></li>');
    } else{
        document.write('<li class="game-state"><figure><img src="images/dragon-wounded.png" alt="Chevalier"><figcaption><p>' + game.pvDragon + ' PV </p><meter id="progression" min="0" max="' + game.pvDragonInit + '" low="' + game.pvDragonInit*0.3 + ' " high="' + game.pvDragonInit*0.85 + '" value="' + game.pvDragon + '"></meter> </figcaption></figure></li>');
    } 
}

function writeTurn(){
    if (game.tirageDragon > game.tirageUser){
        document.write('<li class="round-log dragon-attacks"><h2 class="subtitle">Tour n°' + game.turn + '</h2><img src="images/dragon-winner.png" alt="Dragon"><p>Le dragon prend linitiative, vous attaque et vous inflige' + game.pointsDomage + ' points de dommage !</p></li>');
    }else{
        document.write('<li class="round-log player-attacks"><h2 class="subtitle">Tour n°' + game.turn + '</h2><img src="images/knight-winner.png" alt="Chevalier"><p>Vous êtes le plus rapide, vous attaquez le dragon et lui infligez' + game.pointsDomage + 'points de dommage !</p></li>');
    }
}
