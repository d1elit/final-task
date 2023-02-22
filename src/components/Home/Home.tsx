import Games from '../Games/Games';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Home.scss';

export default function Home() {
  const { t, i18n } = useTranslation();

  return (
    <header className="home">
      <div className="home__container">
        <div className="home__games">
          <Games />
        </div>
      </div>
    </header>
  );
}
