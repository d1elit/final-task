import React from 'react';
import './GameStats.scss';
import cn from 'classnames';
import { LocalText } from '../../types/localisationTypes';
import { getLang } from '../../utils/localisationUtils';

const timeText: LocalText = { eng: 'TIME', rus: 'ВРЕМЯ' };
const scoreText: LocalText = { eng: 'SCORE', rus: 'ОЧКИ' };
const tilesText: LocalText = { eng: 'TILES', rus: 'ПЛИТКА' };
const trialText: LocalText = { eng: 'TRIAL', rus: 'ПОПЫТКА' };

interface Props {
  tiles?: number;
  trial?: number;
  timer?: string | number;
  score?: number;
  multiplier?: number;
  streak?: number;
  colorStyle?: string;
}

export default function GameStats({
  tiles,
  trial,
  timer,
  score,
  multiplier,
  streak,
  colorStyle,
}: Props) {
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
    <div className={cn('game-stats', colorStyle && `game-stats_${colorStyle}`)}>
      {tiles !== undefined && (
        <div className="game-stats__item game-stats__tiles">
          <span className="game-stats__name">{tilesText[getLang()]}</span>
          <span className="game-stats__value">{tiles}</span>
        </div>
      )}
      {trial !== undefined && (
        <div className="game-stats__item game-stats__timer">
          <span className="game-stats__name">{trialText[getLang()]}</span>
          <span className="game-stats__value">{`${trial} of 12`}</span>
        </div>
      )}
      {timer !== undefined && (
        <div className="game-stats__item game-stats__timer">
          <span className="game-stats__name">{timeText[getLang()]}</span>
          <span className="game-stats__value">
            {timer ? `00:${timer >= 10 ? timer : `0${timer}`}` : '00:00'}
          </span>
        </div>
      )}
      {score !== undefined && (
        <div className="game-stats__item game-stats__score">
          <span className="game-stats__name">{scoreText[getLang()]}</span>
          <span className="game-stats__value">{score ? score : '0'}</span>
        </div>
      )}
      {streak !== undefined && drawSuccessStreak()}
    </div>
  );
}
