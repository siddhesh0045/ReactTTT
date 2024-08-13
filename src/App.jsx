import Player from "./componants/Player.jsx";
import GameBoard from "./componants/GameBoard.jsx";
import GameOver from "./componants/GameOver.jsx";
import Log from "./componants/Log.jsx";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const intialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// const PLAYERS = {

// }

function deriveActivePlayer(gameTurns) {
  let currentPllayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPllayer = "O";
  }
  return currentPllayer;
}

function deriveWinner(gameBoard, players) {
  let winnerDeclared;
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      secondSquareSymbol === thirdSquareSymbol
    ) {
      winnerDeclared = firstSquareSymbol;
      winner = players[firstSquareSymbol];
    }
  }
  return { winner, winnerDeclared };
}

function deriveGameBoard(gameTurns) {
  // let gameBoard = intialGameBoard;
  let gameBoard = [...intialGameBoard.map((array) => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  const [players, setplayers] = useState({ X: "Player 1", O: "Player 2" });
  const [gameTurns, setGameTurns] = useState([]);

  // const [hasWinner,setHasWinner] = useState(false); //this is redundant

  //........
  const gameBoard = deriveGameBoard(gameTurns);
  // const [activePlayer,setActivePlayer] = useState('X');
  const activePlayer = deriveActivePlayer(gameTurns);

  const { winner, winnerDeclared } = deriveWinner(gameBoard, players);

  const hasDraaw = gameTurns.length === 9 && !winner;
  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer)=>(curActivePlayer ==='X'?'O':'X'));

    setGameTurns((prevTurns) => {
      const currentPllayer = deriveActivePlayer(gameTurns);
      const updateturns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPllayer },
        ...prevTurns,
      ];

      return updateturns;
    });
  }
  function handlRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setplayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName="player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraaw || winnerDeclared) && (
          <GameOver
            winner={winner}
            onRestart={handlRestart}
            winnerDeclared={winnerDeclared}
          />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
