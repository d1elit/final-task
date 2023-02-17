import cn from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './Results.scss';

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
  const { t } = useTranslation();
  return (
    <div className="results">
      <h2 className="results__title">{gameName}</h2>
      <div className="results__item results__score">
        {t('results.score')}: <span className="results__data"> {score}</span>
      </div>
      <div className="results__item">
        {t('results.correct')}:{' '}
        <span className="results__data">
          {correct}/{count}
        </span>
      </div>
      {correct !== undefined && count !== undefined && (
        <div className="results__item">
          {t('results.accuracy')}:
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
        {t('results.tryAgain')}
      </button>
    </div>
  );
}
