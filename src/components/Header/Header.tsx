import React from 'react';
import './Header.scss';
import logo from '../../assets/images/lumosityLogo.png';
import { Link } from 'react-router-dom';

export default function Header() {
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
                onClick={() => {
                  localStorage.setItem('lang', 'rus');
                }}
              >
                rus
              </button>
            </li>

            <li className="header__menu-item">
              <button
                className="header__lang"
                onClick={() => {
                  localStorage.setItem('lang', 'eng');
                }}
              >
                eng
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
