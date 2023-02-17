/* eslint-disable @typescript-eslint/no-floating-promises */
import React from 'react';
import './Header.scss';
import logo from '../../assets/images/lumosityLogo.png';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { setStyles } from '../../utils/localisationUtils';

export default function Header() {
  const { i18n } = useTranslation();
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
                className="header__lang"
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
                className="header__lang header__lang_active"
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
                  Sign Up
                </Link>
              </li>
              <li className="header__account-item">
                <Link className="header__account-link" to={'./login'}>
                  Log In
                </Link>
              </li>
              <li className="header__account-item">
                <Link className="header__account-link" to={'./logout'}>
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}