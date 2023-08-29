import React from 'react'
import Square from './Square';

export default function Board({squares, onPlay}) {

    function handleClick(row, col) {
        if (squares[row][col] !== null) return;
        onPlay(row, col);
    }

    const Board = [];
    for (let row = 0; row < 3; row++) {
        const Row = [];
        for (let col = 0; col < 3; col++) {
            Row.push(<Square key={`${row}${col}`} value={squares[row][col]} onSquareClick={() => {handleClick(row, col)}} />);
        }
        Board.push(<div key={`${row}`} className='board-row'>{Row}</div>);
    }
  return (
    <div className='board'>
      {Board}
    </div>
  )
}
