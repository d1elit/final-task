import { useTranslation } from 'react-i18next';

export default function HowToPlaySpeedMatch() {
  const { t } = useTranslation();

  return (
    <div>
      <p className="how-to-play-done__text">
        {t('speedMatch.howToPlayDone.text1')}
      </p>
      <p className="how-to-play-done__text">
        {t('speedMatch.howToPlayDone.text2')}
      </p>
    </div>
  );
}
