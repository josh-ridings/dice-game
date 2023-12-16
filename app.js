var overAllScore, roundScore, activePlayer, gameIsActive, preRoll;

init();

// roll dice functionallity
document.querySelector('.btn-roll').addEventListener('click', function() {
    
    if (gameIsActive) {
        
        // create a random number
        var diceRoll = Math.floor(Math.random() * 6) + 1;
        console.log(diceRoll);

        // update the dice picture according to random number
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src='dice-' + diceRoll + '.png';

        // update the round score IF the user doesn't roll a 1
        if ((diceRoll === 6 && preRoll === 6) || (diceRoll === 1)) {
            changePlayer();
        } else {
            // change player
            roundScore += diceRoll;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        }
        preRoll = diceRoll;
    }
})

// hold button functionallity
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gameIsActive) {
        
        // update active player score
        overAllScores[activePlayer] += roundScore;

        // update the UI
        document.getElementById('score-' + activePlayer).textContent = overAllScores[activePlayer];
        
        // check if player inputs a desired winning score and update accordingly
        var finalScoreInput = document.querySelector('.final-score').value;
        var winningScore;
        
        if (finalScoreInput) {
            winningScore = finalScoreInput;
        } else {
            winningScore = 100
        }

        // check if player has won
        if (overAllScores[activePlayer] >= winningScore) {
            endGame();
        } else {
            changePlayer();
        }   
    }
})

// new game button funtionallity
document.querySelector('.btn-new').addEventListener('click', init);



// inner functions
function init() {
    overAllScores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gameIsActive = true;

    // sets dice picture to not show before initialising an event
    document.querySelector('.dice').style.display = 'none';

    // sets all scores/roundScores to 0
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('Winner');
    document.querySelector('.player-1-panel').classList.remove('Winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    
    document.querySelector('.player-0-panel').classList.add('active');
}

function changePlayer() {
    
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0; 

    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}

function endGame() {
    gameIsActive = false;
    document.getElementById('name-' + activePlayer).textContent = 'Winner';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
}








