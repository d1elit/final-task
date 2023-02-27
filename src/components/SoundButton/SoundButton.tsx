import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getIsSound, setIsSound } from '../../utils/soundUtils';
import './SoundButton.scss';

interface SoundButtonProps {
  setSoundOn: React.Dispatch<React.SetStateAction<boolean>>;
  children?: JSX.Element;
}

export default function SoundButton({ setSoundOn }: SoundButtonProps) {
  const { t } = useTranslation();

  const initSound = getIsSound();

  const [isSoundOn, setIsSoundOn] = useState(initSound);

  function onClickBtn() {
    setIsSoundOn(prev => {
      setSoundOn(!isSoundOn);
      setIsSound(!isSoundOn);
      return !prev;
    });
  }

  return (
    <div className="sound-button" onClick={onClickBtn}>
      <div
        className={`sound-button__icon sound-button__icon${
          isSoundOn ? '_on' : '_off'
        }`}
      ></div>
      <div className="sound-button__text">
        {isSoundOn ? t('sound.on') : t('sound.off')}
      </div>
    </div>
  );
}
