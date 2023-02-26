import { useTranslation } from 'react-i18next';
import './AboutProject.scss';

export default function AboutProject() {
  const { t } = useTranslation();

  return (
    <div>
      <div className="about">
        <span className="about__text">{t('about.project.1')}</span>
        <span className="about__name"> Lumosity Clone </span>
        <span className="about__text">{t('about.project.2')}</span>
        <span>
          {' '}
          <a
            href="https://www.lumosity.com/"
            className="about__link"
            target="_blank"
          >
            Lumosity.com
          </a>
        </span>
        <span className="about__text">{t('about.project.3')}</span>
      </div>
    </div>
  );
}
