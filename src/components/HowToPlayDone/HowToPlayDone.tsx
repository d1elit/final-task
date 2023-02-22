import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './HowToPlayDone.scss';
import '../StartGame/StartGame.scss';
import cn from 'classnames';

import howToIn from '../../assets/sounds/howTo/howToIn.mp3';
import howToOut from '../../assets/sounds/howTo/howToOut.mp3';

export enum TypeConfirm {
  button = 'button',
  keys = 'keys',
}

type Props = {
  colorStyle?: string;
  onPlayHandler: () => void;
  typeConfirm: TypeConfirm;
  children?: JSX.Element;
};

const HIDE_DELAY = 700;

export default function HowToPlayDone({
  colorStyle,
  onPlayHandler,
  typeConfirm,
  children,
}: Props) {
  const { t } = useTranslation();

  const [hideWindow, setHideWindow] = useState(false);

  void new Audio(howToIn).play();

  const onClick = () => {
    setHideWindow(true);
    void new Audio(howToOut).play();

    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      onPlayHandler();
      clearTimeout(timer);
    }, HIDE_DELAY);
  };

  const onKeyControlsHandler = (event: KeyboardEvent) => {
    const key = event.key;
    if (
      key === 'ArrowUp' ||
      key === 'ArrowRight' ||
      key === 'ArrowDown' ||
      key === 'ArrowLeft'
    ) {
      onClick();
    }
  };

  useEffect(() => {
    typeConfirm === TypeConfirm.keys &&
      document.addEventListener('keydown', onKeyControlsHandler);
    return () => {
      typeConfirm === TypeConfirm.keys &&
        document.removeEventListener('keydown', onKeyControlsHandler);
    };
  }, []);

  return (
    <div
      className={`how-to-play-done ${hideWindow ? 'how-to-play-done-out' : ''}`}
    >
      <div className="how-to-play-done__window">
        {children}
        {typeConfirm === TypeConfirm.button && (
          <button
            className={cn(
              'start-game__btn',
              colorStyle && `start-game_${colorStyle}`
            )}
            onClick={onClick}
          >
            {t('startGame.play')}
          </button>
        )}
      </div>
      {typeConfirm === TypeConfirm.keys && (
        <div className="how-to-play-done__btn" onClick={onClick}>
          {t('howToPlayDone.keys')}
        </div>
      )}
    </div>
  );
}
