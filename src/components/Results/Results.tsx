import cn from 'classnames';
import React from 'react';
import { LocalText } from '../../types/localisationTypes';
import { getLang } from '../../utils/localisationUtils';
import './Results.scss';

const correctText: LocalText = { eng: 'CORRECT', rus: 'ВЕРНО' };
const scoreText: LocalText = { eng: 'SCORE', rus: 'ОЧКИ' };
const accuracyText: LocalText = { eng: 'ACCURACY', rus: 'ТОЧНОСТЬ' };
const tryAgainText: LocalText = { eng: 'Try again', rus: 'Попробовать снова' };
interface Props {
  score: number;
  gameName: string;
  correct?: number;
  count?: number;
  colorStyle?: string;
  onRetryHandler: () => void;
}

export default function Results({
  score,
  correct,
  count,
  colorStyle,
  onRetryHandler,
  gameName,
}: Props) {
  return (
    <div className="results">
      <h2 className="results__title">{gameName}</h2>
      <div className="results__item results__score">
        {scoreText[getLang()]}: <span className="results__data"> {score}</span>
      </div>
      <div className="results__item">
        {correctText[getLang()]}:{' '}
        <span className="results__data">
          {correct}/{count}
        </span>
      </div>
      {correct !== undefined && count !== undefined && (
        <div className="results__item">
          {accuracyText[getLang()]}:
          <span className="results__data">
            {correct !== 0 ? Math.round((correct / count) * 100) : 0}%
          </span>
        </div>
      )}
      <button
        className={cn(
          'results__btn start-game__btn',
          colorStyle && `start-game_${colorStyle}`
        )}
        onClick={onRetryHandler}
      >
        {tryAgainText[getLang()]}
      </button>
    </div>
  );
}
