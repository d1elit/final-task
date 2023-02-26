import React from 'react';
import './AnswerIndicator.scss';
type Props = {
  isSuccess: boolean;
  classname?: string;
};

export default function AnswerIndicator({ isSuccess, classname }: Props) {
  return (
    <div
      className={`answer-indecator ${
        classname ? 'answer-indecator' + classname : ''
      }`}
    >
      {isSuccess ? (
        <div className="answer-indecator__success">✔</div>
      ) : (
        <div className="answer-indecator__failure">❌</div>
      )}
    </div>
  );
}
