import React from 'react';
import { useTranslation } from 'react-i18next';
import './HowToPlay.scss';
import '../StartGame/StartGame.scss';

type Props = {
  gameRules: string;
  onPlayHandler: () => void;
};

export default function HowToPlay({ gameRules, onPlayHandler }: Props) {
  const { t } = useTranslation();
  return (
    <div className="how-to-play">
      <h2 className="how-to-play__title">{t('howToPlay.title')}</h2>
      <p className="how-to-play__rules"> {gameRules}</p>
      <button className="start-game__btn" onClick={onPlayHandler}>
        Start Game
      </button>
    </div>
  );
}
