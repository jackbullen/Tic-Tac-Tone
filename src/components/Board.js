import React from 'react'
import Square from './Square';

let context;
let oscillators = [];
let gainNode;
let currentTime;

export default function Board({squares, onPlay}) {
  
    function handleClick(row, col) {
        if (squares[row][col] !== null) return;
        onPlay(row, col);
        playChord(440, 2000);
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

function getNoteFrequency(noteName) {
  const noteFrequencies = {
      'C': 261.63,
      'C#': 277.18,
      'D': 293.66,
      'D#': 311.13,
      'E': 329.63,
      'F': 349.23,
      'F#': 369.99,
      'G': 392.00,
      'G#': 415.30,
      'A': 440.00,
      'A#': 466.16,
      'B': 493.88,
  };
  return noteFrequencies[noteName];
}

function createToneOscillator(frequency) {
  var oscillator = context.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.value = frequency; 
  oscillator.connect(context.destination);
  oscillators.push(oscillator);
}

function playChord(chord, duration) {
  context = new (window.AudioContext || window.webkitAudioContext)();
  gainNode = context.createGain();
  gainNode.connect(context.destination);
  createToneOscillator(getNoteFrequency("C"));
  createToneOscillator(getNoteFrequency("E"));
  createToneOscillator(getNoteFrequency("G"));

  oscillators.forEach(oscillator => {
      oscillator.connect(gainNode);
      currentTime = context.currentTime;
      oscillator.start(currentTime);
      oscillator.stop(currentTime + 2); 
  });
}
  