import cn from 'classnames';
import './StartGame.scss';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

interface StartGameProps {
  title: string;
  colorStyle?: string;
  description: string;
  onPlayHandler: () => void;
  onHowToPlayHandler: () => void;
}

const HIDE_DELAY = 700;

export default function StartGame({
  title,
  colorStyle,
  description,
  onPlayHandler,
  onHowToPlayHandler,
}: StartGameProps) {
  const { t } = useTranslation();
  const [hideWindow, setHideWindow] = useState(false);

  const onClickHowToPlay = () => {
    setHideWindow(true);
    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      onHowToPlayHandler();
      clearTimeout(timer);
    }, HIDE_DELAY);
  };

  const onClickPlay = () => {
    setHideWindow(true);
    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      onPlayHandler();
      clearTimeout(timer);
    }, HIDE_DELAY);
  };

  return (
    <div className={`start-game ${hideWindow ? 'start-game-out' : ''}`}>
      <h2 className="start-game__title">{title}</h2>
      <p className="start-game__description">{description}</p>
      <div className="start-game__controls">
        <button
          className="start-game__btn start-game__btn_rules"
          onClick={onClickHowToPlay}
        >
          {t('startGame.howToPlay')}
        </button>
        <button
          className={cn(
            'start-game__btn',
            colorStyle && `start-game_${colorStyle}`
          )}
          onClick={onClickPlay}
        >
          {t('startGame.play')}
        </button>
      </div>
    </div>
  );
}
