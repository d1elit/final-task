import React from 'react';
import './GameStats.scss';

interface Props {
  timer?: string | number;
  score?: number;
  multiplier?: number;
  streak?: number;
}

export default function GameStats({ timer, score, multiplier, streak }: Props) {
  const drawSuccessStreak = () => {
    return (
      <div className="game-stats__item multiplier">
        {[1, 2, 3, 4].map((e, i) => {
          return i >= (streak as number) ? (
            <span className="multiplier__item" key={i}></span>
          ) : (
            <span
              className="multiplier__item multiplier__item_filled"
              key={i}
            ></span>
          );
        })}
        <span className="game-stats__value">
          x{multiplier ? multiplier : '0'}
        </span>
      </div>
    );
  };

  return (
    <div className="game-stats">
      <div className="game-stats__item game-stats__timer">
        <span className="game-stats__name">TIME</span>
        <span className="game-stats__value">
          {timer ? `00:${timer >= 10 ? timer : `0${timer}`}` : '00:00'}
        </span>
      </div>
      <div className="game-stats__item game-stats__score">
        <span className="game-stats__name">SCORE</span>
        <span className="game-stats__value">{score ? score : '0'}</span>
      </div>
      {streak !== undefined ? drawSuccessStreak() : ''}
    </div>
  );
}
