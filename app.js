/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice;     //it needs to be in global scope becauase if its only creted in this function, the function ends and we cant access it

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {             //if checks if its true or false, gamePlying is already true, so this works alone
    // 1. random number
    var dice = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    //2. display result
    var diceDOM = document.querySelector(".dice"); //get random dice number
    diceDOM.style.display = "block"; //to display it in block way
    diceDOM.src = "dice-" + dice + ".png"; // to access different dice img based on the random nmbr

    var dice2DOM = document.querySelector(".dice2"); //get random dice number
    dice2DOM.style.display = "block"; //to display it in block way
    dice2DOM.src = "dice-" + dice2 + ".png";

    // 3. Update the round score IF the rolled number is not 1
    if (dice === 6 && lastDice === 6) {
      //Player loses score
      scores[activePlayer] = 0;
      document.querySelector("#score-" + activePlayer).textContent = '0';
      nextPlayer();
    } else if (dice !== 1) {
      //add score
      roundScore += dice + dice2;
      document.querySelector("#current-" + activePlayer).textContent = roundScore;
    } else {
      //Next player
      nextPlayer();
    }
    if (dice2 !== 1) {
      //add score
      roundScore += dice + dice2;
      document.querySelector("#current-" + activePlayer).textContent = roundScore;
    } else {
      //Next player
      nextPlayer();
    }

    lastDice = dice;        //we write it only here since dice has been thrown and this is where we can get that throw
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    // Add current score to the global score
    scores[activePlayer] += roundScore;

    // Update the User interface
    document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

    var input = document.querySelector('.final-score').value;
    var winningScore;
    //Undefined, 0, null or "" are COERCED to false   (we use this to check if score input is used, e.g number, or not, eg undefined)
    //Anything else will be COERCED to true
    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    // Check if player won the game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice").style.display = "none";

      document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
      document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
      gamePlaying = false;        //game stops coz we have winner, now hold button or roll dice does not work
    } else {
      // Next player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  //Next player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0); //ako je active player bio 0 postaje 1 a ako je bio 1 postaje 0
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
  document.querySelector(".dice2").style.display = "none";

}

document.querySelector(".btn-new").addEventListener("click", init);   //e.g. of calling a function only when neeeded


function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  document.querySelector(".dice").style.display = "none";
  document.querySelector(".dice2").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}





//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
//var x = document.querySelector('#score-0').textContent; //this is a getter, coz it gets the value

//document.querySelector(".player-0-panel").classList.remove("active");
//document.querySelector(".player-1-panel").classList.add("active");



/*
Challenge

1. 6 + 6 in same round = global plus current score = 0


*/
