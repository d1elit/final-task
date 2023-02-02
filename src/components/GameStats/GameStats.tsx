import React from 'react'
import './GameStats.scss'

interface Props {
  timer?: string | number
  score?: number
}

export default function GameStats({timer, score}: Props) {
  return (
    <div className='game-stats'>
      <div className="game-stats__item game-stats__timer">
        <span className="game-stats__name">TIME</span>
        <span className="game-stats__value">{timer ? timer : '00:30'}</span>
      </div>
      <div className="game-stats__item game-stats__score">
        <span className="game-stats__name">SCORE</span>
        <span className="game-stats__value">{score ? score : '0'}</span>
      </div>
    </div>
  )
}