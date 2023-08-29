import React, { useState } from 'react'
import Board from './Board'

export default function Game() {
  const [firstPlayerTurn, setFirstPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [history, setHistory] = useState([[Array(3).fill(null), Array(3).fill(null), Array(3).fill(null)]]);
  const [currentMove, setCurrentMove] = useState(0);
  const squares = history[currentMove];

  function handlePlay(row, col) {
    if (winner !== null) return;
    const newSquares = squares.map(row => [...row]);
    firstPlayerTurn ? newSquares[row][col] = 'X' : newSquares[row][col] = 'O';
    setWinner(isGameOver(newSquares));
    setHistory([...history.slice(0, currentMove+1), newSquares]);
    setCurrentMove(currentMove+1);
    setFirstPlayerTurn(!firstPlayerTurn);
  }

  return (
    <div className='game'>
      <div className='game-board'>
        <Board squares={squares} onPlay={handlePlay}/>
        <div className='game-info'>
          <button onClick={() => {setCurrentMove(0); setFirstPlayerTurn(true); setWinner(null);}}>New Game</button>
        </div>
      </div>
      <p>{winner===null ? `Turn to play ${firstPlayerTurn ? "X" : "O"}` : `Winner: ${winner}`}</p>
    </div>
  )
}

function isGameOver(squares){
  // checks squares to see if there is three of same symbol in a line
  // possible lines are:
  // -slope diagonal
  if (squares[0][0] === squares[1][1] && squares[1][1] === squares[2][2] && squares[0][0] !== null) {
      return squares[0][0];
  }
  // +slope diagonal
  if (squares[2][0] === squares[1][1] && squares[1][1] === squares[0][2] && squares[2][0] !== null) {
      return squares[2][0];
  }
  for (let index = 0; index < 3; index++) {
      // rows
      if (squares[index][0] === squares[index][1] && squares[index][1] === squares[index][2] && squares[index][0] !== null) {
          return squares[index][0];
      }
      // cols
      if (squares[0][index] === squares[1][index] && squares[1][index] === squares[2][index] && squares[0][index] !== null) {
          return squares[0][index];
      }
  }
  return null;
}