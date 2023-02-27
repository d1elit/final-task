import { useTranslation } from 'react-i18next';
import './Footer.scss';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer__container">
        <nav className="footer__menu">
          <ul className="footer__menu-list">
            <li className="footer__menu-item">
              <a
                className="footer__menu-link"
                href="https://github.com/d1elit"
                target="_blank"
              >
                <div className="footer__menu-icon"></div>
                <div className="footer__menu-text">
                  {t('team.artem.fullname')}
                </div>
              </a>
            </li>
            <li className="footer__menu-item">
              <a
                className="footer__menu-link"
                href="https://github.com/DefK1lla"
                target="_blank"
              >
                <div className="footer__menu-icon"></div>
                <div className="footer__menu-text">
                  {t('team.sedrak.fullname')}
                </div>
              </a>
            </li>
            <li className="footer__menu-item">
              <a
                className="footer__menu-link"
                href="https://github.com/EvgeniiKolesnikov"
                target="_blank"
              >
                <div className="footer__menu-icon"></div>
                <div className="footer__menu-text">
                  {t('team.evgenii.fullname')}
                </div>
              </a>
            </li>
          </ul>
        </nav>

        <a
          className="footer__rss"
          href="https://rs.school/js/"
          target="_blank"
        ></a>
      </div>
    </footer>
  );
}
