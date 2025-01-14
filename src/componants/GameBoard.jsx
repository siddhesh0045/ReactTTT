import { useState } from "react";

// const intialGameBoard = [
//   [null, null, null],
//   [null, null, null],
//   [null, null, null],
// ];

export default function GameBoard({ onSelectSquare, board }) {
  // let gameBoard = intialGameBoard;
  // for(const turn of turns){
  //     const {square,player} = turn;
  //     const {row,col}=square;

  //     gameBoard[row][col]=player;
  // }

  // const [GameBoard,setGameBoard] = useState(intialGameBoard);

  // function handleSelectSquare(rowIndex,colIndex,symbol){
  //     setGameBoard((prevGameBoard)=>{
  //         const updatedBoard = [...prevGameBoard.map(innerArray=>[...innerArray])];
  //         updatedBoard[rowIndex][colIndex]=activePlayerSymbol;

  //         return updatedBoard;

  //     });

  //     onSelectSquare();
  // }

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
