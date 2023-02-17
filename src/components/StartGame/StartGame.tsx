import cn from 'classnames';
import './StartGame.scss';
import { useTranslation } from 'react-i18next';

interface StartGameProps {
  title: string;
  colorStyle?: string;
  description: string;
  onPlayHandler: () => void;
}

export default function StartGame({
  title,
  colorStyle,
  description,
  onPlayHandler,
}: StartGameProps) {
  const { t } = useTranslation();
  return (
    <div className="start-game">
      <h2 className="start-game__title">{title}</h2>
      <p className="start-game__description">{description}</p>
      <div className="start-game__controls">
        <button className="start-game__btn start-game__btn_rules">
          {t('startGame.howToPlay')}
        </button>
        <button
          className={cn(
            'start-game__btn',
            colorStyle && `start-game_${colorStyle}`
          )}
          onClick={onPlayHandler}
        >
          {t('startGame.play')}
        </button>
      </div>
    </div>
  );
}
