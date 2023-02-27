import authApi from '../../shared/api/auth';
import { Link } from 'react-router-dom';
import { setLocalisationStyle, setStyles } from '../../utils/localisationUtils';
import { useActionCreators, useAppSelector } from '../../shared/hooks/store';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './Header.scss';

import appLogo from '../../assets/images/appLogos/lumosityLogo.png';
import memoryMatch from '../../assets/images/gameLogos/memoryMatch.png';
import memoryMatrix from '../../assets/images/gameLogos/memoryMatrix.png';
import rotationMatrix from '../../assets/images/gameLogos/rotationMatrix.png';
import speedMatch from '../../assets/images/gameLogos/speedMatch.png';
import { initSound } from '../../utils/soundUtils';

initSound();

export default function Header() {
  const username = useAppSelector(state => state.user.data?.username);
  const actions = useActionCreators(authApi);

  const handleLogOut = () => {
    void actions.logout(null);
  };

  const { t } = useTranslation();
  useEffect(() => {
    setLocalisationStyle();
  }, []);

  const langTitle = t('header.langTitle');

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <Link to={'./'}>
            <img
              className="header__logo-img"
              src={appLogo}
              alt="lumosity Logo"
              title="Lumosity Clone"
            />
          </Link>
        </div>
        <nav className="header__menu">
          <ul className="header__menu-list">
            <li className="header__menu-item">
              <Link
                className="header__menu-link header__menu-link_home"
                to="./"
              >
                {t('header.home')}
              </Link>
            </li>

            <li className="header__games">
              <div className="header__games-name">{t('header.games')}</div>
              <div className="header__games-menu">
                <ul className="header__games-list">
                  <li className="header__games-item">
                    <Link className="header__games-link" to="./speedmatch">
                      <img
                        className="header__games-image"
                        src={speedMatch}
                        alt="speedMatch"
                      />
                      <div className="header__games-text">Speed Match</div>
                    </Link>
                  </li>
                  <li className="header__games-item">
                    <Link className="header__games-link" to="./memorymatch">
                      <img
                        className="header__games-image"
                        src={memoryMatch}
                        alt="memorydMatch"
                      />
                      <div className="header__games-text">Memory Match</div>
                    </Link>
                  </li>
                  <li className="header__games-item">
                    <Link className="header__games-link" to="./memorymatrix">
                      <img
                        className="header__games-image"
                        src={memoryMatrix}
                        alt="memorydMatrix"
                      />
                      <div className="header__games-text">Memory Matrix</div>
                    </Link>
                  </li>
                  <li className="header__games-item">
                    <Link className="header__games-link" to="./rotationmatrix">
                      <img
                        className="header__games-image"
                        src={rotationMatrix}
                        alt="rotationMatrix"
                      />
                      <div className="header__games-text">Rotation Matrix</div>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            {username ? (
              <li className="header__menu-item">
                <Link
                  className="header__menu-link header__menu-link_stats"
                  to="./stats"
                >
                  {t('header.stats')}
                </Link>
              </li>
            ) : (
              <li className="header__menu-item header__menu-link_stats header__menu-item_disabled">
                <div className="header__menu-link header__menu-link_disabled">
                  {t('header.stats')}
                </div>
              </li>
            )}
            <li className="header__lang-container">
              <button
                className="header__lang header__lang_en"
                title={langTitle}
                onClick={() => setStyles()}
              ></button>
            </li>
          </ul>
        </nav>
        <div className="header__account">
          <div className="header__account-name">
            {username || t('header.account')}
          </div>
          <div className="header__account-menu">
            <ul className="header__account-list">
              <li className="header__account-item">
                {username ? (
                  <button
                    className="header__account-link"
                    onClick={handleLogOut}
                  >
                    {t('login.logOut')}
                  </button>
                ) : (
                  <Link className="header__account-link" to={'./login'}>
                    {t('login.login')}
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
