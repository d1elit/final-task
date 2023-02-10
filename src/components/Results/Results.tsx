import React from 'react';
import './Results.scss';

interface Props {
  score: number;
  correct?: number;
  count?: number;
  onRetryHandler: () => void;
}

export default function Results({
  score,
  correct,
  count,
  onRetryHandler,
}: Props) {
  return (
    <div className="results">
      <h2 className="results__title">Speed Match</h2>
      <div className="results__item results__score">
        Score: <span className="results__data"> {score}</span>
      </div>
      <div className="results__item">
        Correct:{' '}
        <span className="results__data">
          {correct}/{count}
        </span>
      </div>
      {correct !== undefined && count !== undefined && (
        <div className="results__item">
          Accuracy:
          <span className="results__data">
            {' '}
            {correct !== 0 ? Math.round((correct / count) * 100) : 0}%
          </span>
        </div>
      )}
      <button className="results__btn start-game__btn" onClick={onRetryHandler}>
        Try again
      </button>
    </div>
  );
}
