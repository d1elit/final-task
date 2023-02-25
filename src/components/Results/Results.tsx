import cn from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { getEndOfWord } from '../../utils/endOfWord';
import './Results.scss';

interface Props {
  score: number;
  gameName: string;
  correct?: number;
  count?: number;
  bestBoard?: number;
  colorStyle?: string;
  onRetryHandler: () => void;
}

export default function Results({
  score,
  correct,
  count,
  bestBoard,
  colorStyle,
  onRetryHandler,
  gameName,
}: Props) {
  const { i18n, t } = useTranslation();
  return (
    <div className="results">
      <h2 className="results__title">{gameName}</h2>
      <div className="results__item results__score">
        <span className="results__item-name">{t('results.score')}:</span>
        <span
          className={cn(
            'results__data',
            colorStyle && `results__data_${colorStyle}`
          )}
        >
          {score}
        </span>
      </div>
      {correct !== undefined && count !== undefined && (
        <>
          <div className="results__item">
            <span className="results__item-name">{t('results.correct')}:</span>
            <span
              className={cn(
                'results__data',
                colorStyle && `results__data_${colorStyle}`
              )}
            >
              {correct}/{count}
            </span>
          </div>

          <div className="results__item">
            <span className="results__item-name">{t('results.accuracy')}:</span>
            <span
              className={cn(
                'results__data',
                colorStyle && `results__data_${colorStyle}`
              )}
            >
              {correct !== 0 ? Math.round((correct / count) * 100) : 0}%
            </span>
          </div>
        </>
      )}
      {bestBoard !== undefined && (
        <div className="results__item">
          <span className="results__item-name">{t('results.bestBoard')}:</span>
          <span
            className={cn(
              'results__data',
              colorStyle && `results__data_${colorStyle}`
            )}
          >
            {bestBoard} {t('results.bestBoardTiles')}
            {getEndOfWord(i18n.language, bestBoard, 'ка', 'ки', 'ок')}
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
