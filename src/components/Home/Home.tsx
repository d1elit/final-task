import Games from '../Games/Games';
import { useTranslation } from 'react-i18next';
import './Home.scss';
import Team from '../Team/Team';
import AboutProject from '../AboutProject/AboutProject';

export default function Home() {
  const { t } = useTranslation();

  return (
    <header className="home">
      <div className="home__container">
        <div className="home__header">{t('home.about')}</div>
        <AboutProject />
        <div className="home__header">{t('home.games')}</div>
        <Games />
        <div className="home__header">{t('home.team')}</div>
        <Team />
        <div className="home__date">2023</div>
      </div>
    </header>
  );
}
