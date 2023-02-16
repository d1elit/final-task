import cn from 'classnames';
import React from 'react';
import { LocalText } from '../../types/localisationTypes';
import { getLang } from '../../utils/localisationUtils';
import './StartGame.scss';

interface StartGameProps {
  title: string;
  colorStyle?: string;
  description: string;
  onPlayHandler: () => void;
}

const howToPlayText: LocalText = {
  eng: 'How To Play?',
  rus: 'Как играть?',
};

const playText: LocalText = {
  eng: 'Play',
  rus: 'Играть',
};

export default function StartGame({
  title,
  colorStyle,
  description,
  onPlayHandler,
}: StartGameProps) {
  return (
    <div className="start-game">
      <h2 className="start-game__title">{title}</h2>
      <p className="start-game__description">{description}</p>
      <div className="start-game__controls">
        <button className="start-game__btn start-game__btn_rules">
          {howToPlayText[getLang()]}
        </button>
        <button
          className={cn(
            'start-game__btn',
            colorStyle && `start-game_${colorStyle}`
          )}
          onClick={onPlayHandler}
        >
          {playText[getLang()]}
        </button>
      </div>
    </div>
  );
}
