export default function GameOver({ winner, onRestart, winnerDeclared }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner && <p>{winner} WON!</p>}
      {!winner && winnerDeclared && <p>{winnerDeclared} WON!</p>}
      {!winner && !winnerDeclared && <p>It's a draw!</p>}
      <p>
        <button onClick={onRestart}>Rematch</button>
      </p>
    </div>
  );
}
