import React from 'react'

export default function Square({value, onSquareClick, note}) {
  return (
    <div className='square-container'>
      <button className='square' onClick={onSquareClick}>
        <span className="note-text">{note}</span>
        <span className='square-text'>{value}</span>
      </button>
    </div>
  )
}
