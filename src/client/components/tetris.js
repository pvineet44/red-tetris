import React, { useState } from 'react'

export const Tetris = () => {
  return (
    <div className="board-wrapper">
      Hello <Board/>
    </div>
    )
  }
  
  export const Board = () => {
  const [players, setPlayers] = useState(0)
  return (
    <h1>Players count
      <div id = 'player-count'>{players}</div>
    </h1>
  )
}
