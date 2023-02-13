import React from 'react';
import './AnswerIndicator.scss';
type Props = {
  isSuccess: boolean;
};

export default function AnswerIndicator({ isSuccess }: Props) {
  return (
    <div className="answer-indecator">
      {isSuccess ? (
        <div className="answer-indecator__success">✔</div>
      ) : (
        <div className="answer-indecator__failure">❌</div>
      )}
    </div>
  );
}
