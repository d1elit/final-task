/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect } from 'react';
import './Header.scss';
import logo from '../../assets/images/lumosityLogo.png';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { setLocalisationStyle, setStyles } from '../../utils/localisationUtils';

export default function Header() {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    setLocalisationStyle();
  }, []);
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <Link to={'./'}>
            <img className="header__logo-img" src={logo} alt="logo" />
          </Link>
        </div>
        <nav className="header__menu">
          <ul className="header__menu-list">
            <li className="header__menu-item">
              <Link className="header__menu-link" to={'./speedmatch'}>
                Speed Match
              </Link>
            </li>
            <li className="header__menu-item">
              <Link className="header__menu-link" to={'./memorymatch'}>
                Memory Match
              </Link>
            </li>
            <li className="header__menu-item">
              <Link className="header__menu-link" to={'./memorymatrix'}>
                Memory Matrix
              </Link>
            </li>
            <li className="header__menu-item">
              <Link className="header__menu-link" to={'./stats'}>
                Stats
              </Link>
            </li>
            <li className="header__menu-item">
              <button
                className="header__lang header__lang_ru"
                onClick={e => {
                  i18n.changeLanguage('ru');
                  setStyles(e);
                }}
              >
                ru
              </button>
            </li>

            <li className="header__menu-item">
              <button
                className="header__lang header__lang_en"
                onClick={e => {
                  i18n.changeLanguage('en');
                  setStyles(e);
                }}
              >
                en
              </button>
            </li>
            {/* <li className="header__menu-item">
              <Link className="header__menu-link" to={'./aboutus'}>
                About us
              </Link>
            </li> */}
          </ul>
        </nav>
        <div className="header__account">
          <div className="header__account-name">Name</div>
          <div className="header__account-menu">
            <ul className="header__account-list">
              <li className="header__account-item">
                <Link className="header__account-link" to={'./signup'}>
                  {t('login.signUp')}
                </Link>
              </li>
              <li className="header__account-item">
                <Link className="header__account-link" to={'./login'}>
                  {t('login.login')}
                </Link>
              </li>
              <li className="header__account-item">
                <Link className="header__account-link" to={'./logout'}>
                  {t('login.logOut')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
