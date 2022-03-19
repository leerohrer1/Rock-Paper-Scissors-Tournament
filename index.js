const numOfPlayers = 2;
const players = []; 
let rounds;
let roundNumber = 0; 

// populate the players array, given the number of players in the tournament
const populatePlayersArray = () => {  
  for (let i = 0; i < numOfPlayers; ++i) {     
  players.push({'player name': 'Player ' + (i + 1), 'highest round won': []})
  }
};

// determine how many rounds the tournament will be, given the number of players
const determineRounds = () => {
  if (numOfPlayers % 2 === 0) {
    return rounds = Math.floor(numOfPlayers / 4); 
  } else {
    for (let i = players.length; i > players.length - (numOfPlayers % 2); --i) {
      players[i - 1]['highest round won'].push(1)
     }
    return rounds = Math.floor(numOfPlayers / 4);
  };
};

// randomize players' shots by matching a random number to the selection of a player's choice of rock, paper, or scissors
const getPlayerChoice = () => {
let randomNumber = Math.floor(Math.random() * 3);
      switch (randomNumber) {
        case 0:
          return 'rock';
        case 1:
          return 'paper';
        case 2:
          return 'scissors';
      };
};

// display players shots for readers to see each step of the game
const displayPlayerShots = (playerX, playerXShot, playerY, playerYShot) => {
  console.log(playerX['player name']  + ' played ' + playerXShot + '. \n' + playerY['player name']  + ' played ' + playerYShot + '.');
};

// determine winner of a game by comparing players shots 
const determineGameWinner = (playerX, playerXShot, playerY, playerYShot) => {
  switch (playerXShot) { 
    case 'rock':
      switch (playerYShot) {
        case 'scissors':
          return playerX;
        case 'paper':
          return playerY;
        case 'rock':
          return 'tie';
      }
    case 'paper':
      switch (playerYShot) {
        case 'rock':            
          return playerX;
        case 'scissors':
          return playerY;
        case 'paper':
          return 'tie';
      }
    case 'scissors':
      switch (playerYShot) {
        case 'paper':
          return playerX;
        case 'rock':
          return playerY;
        case 'scissors':
          return 'tie';
      }
    default: 
      return 'There was a problem determining the winner.';
  };
};

// display winner of a game for readers to see
const displayGameWinner = (winner) => {
  if (winner === 'tie') {
    console.log(`This game is a TIE.`)
  } else {
    console.log(winner['player name'] + ' WINS the GAME!')
  };
};

// play a game, return the winner
const playGame = (playerA, playerB) => {
  const playerAShot = getPlayerChoice();
  const playerBShot = getPlayerChoice();
  const winner = determineGameWinner(playerA, playerAShot, playerB, playerBShot);
  displayPlayerShots(playerA, playerAShot, playerB, playerBShot); 
  displayGameWinner(winner);
  return winner
}

// determine a series winner by tracking who wins best 2 out of 3 games 
const determineSeriesWinner = (playerX, playerY) => {
  let playerXWins = 0;
  let playerYWins = 0;

  while (playerXWins < 2 && playerYWins < 2) {
    let gameWinner = playGame(playerX, playerY);
    switch (gameWinner) {
      case playerX:
        ++playerXWins;
          if (playerXWins === 2) {
            playerX['highest round won'] = [roundNumber];
            return playerX;
          }
        break;
      case playerY:
        ++playerYWins;
          if (playerYWins === 2) {
            playerY['highest round won'] = [roundNumber];
            return playerY;
          }
        break;
      default: 
        'No series winner, yet.';
    };
  }; 
}; 

// display winner of a series for readers to see
const displaySeriesWinner = (winner) => {
   console.log(`${winner['player name']} WINS the SERIES for ROUND ${roundNumber}!\n`);
};


// play a round of the game
const playRound = (roundWinnersArray) => {
  ++roundNumber;
  if (numOfPlayers % 2 === 0) {
    for (let i = 0; i < roundWinnersArray.length; i += 2 ) { displaySeriesWinner(determineSeriesWinner(roundWinnersArray[i],roundWinnersArray[i + 1]));
      } 
  } else {
    for (let i = 0; i < roundWinnersArray.length - 1; i += 2 ) { displaySeriesWinner(determineSeriesWinner(roundWinnersArray[i],roundWinnersArray[i + 1]));
      }
    }
};

// play tournament
const playTournament = () => {
  do {
    playRound(players.filter((player) => {
      return player['highest round won'].includes(roundNumber)}));
  } while (roundNumber < rounds)
};

populatePlayersArray();
determineRounds();
playRound(players);
playTournament();