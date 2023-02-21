import { useTranslation } from 'react-i18next';

export default function HowToPlayMemoryMatrix() {
  const { t } = useTranslation();

  return (
    <div>
      <h3 className="how-to-play-done__title">
        {t('MemoryMatrix.howToPlayDone.title')}
      </h3>
      <div>
        <p className="how-to-play-done__p">
          • {t('MemoryMatrix.howToPlayDone.p1')}
        </p>
        <p className="how-to-play-done__p">
          • {t('MemoryMatrix.howToPlayDone.p2')}
        </p>
      </div>
    </div>
  );
}
