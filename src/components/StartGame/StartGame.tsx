import React, { EventHandler } from 'react';
import './StartGame.scss';

interface StartGameProps {
  title: string;
  description: string;
  onPlayHandler: () => void;
}

export default function StartGame({
  title,
  description,
  onPlayHandler,
}: StartGameProps) {
  return (
    <div className="start-game">
      <h2 className="start-game__title">{title}</h2>
      <p className="start-game__description">{description}</p>
      <div className="start-game__controls">
        <button className="start-game__btn start-game__btn_rules">
          How To Play
        </button>
        <button className="start-game__btn" onClick={onPlayHandler}>
          {' '}
          Play
        </button>
      </div>
    </div>
  );
}
