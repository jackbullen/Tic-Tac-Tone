import React from 'react'
import Square from './Square';
import { playChord, createAudioContext, toggleAudio, toggleVolumeUp, toggleVolumeDown } from './audioUtils';

const context = createAudioContext();

export default function Board({squares, onPlay, gameOver}) {
    
    const chords = ['E7', 'G', 'Dm', 'C', 'F', 'A7', 'A#', 'Vol Up', 'Vol Down'];
    function handleClick(row, col) {
      if (3*row + col < 7){
        playChord(context, chords[3*row+col]);
      } else if (3*row + col === 7){
        toggleVolumeUp();
      } else if (3*row + col === 8){
        toggleVolumeDown();
      }
        if (squares[row][col] !== null || gameOver !== null) return;
        onPlay(row, col);
    }

    const Board = [];
    for (let row = 0; row < 3; row++) {
        const Row = [];
        for (let col = 0; col < 3; col++) {
            Row.push(<Square key={`${row}${col}`} value={squares[row][col]} onSquareClick={() => handleClick(row, col)} note={chords[3*row+col]} />);
        }
        Board.push(<div key={`${row}`} className='board-row'>{Row}</div>);
    }
  return (
    <div className='board'>
      {Board}
      <div className='play-button'>
        <button className="button" data-playing="false" role="switch" aria-checked="false" onClick={toggleAudio}>
        <span>Play/Pause Music</span>
      </button> </div>
    </div>
  )
}
