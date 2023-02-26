import memoryMatch from '../../assets/images/gameLogos/memoryMatch.png';
import memoryMatrix from '../../assets/images/gameLogos/memoryMatrix.png';
import rotationMatrix from '../../assets/images/gameLogos/rotationMatrix.png';
import speedMatch from '../../assets/images/gameLogos/speedMatch.png';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Games.scss';

export default function Games() {
  const { t } = useTranslation();

  return (
    <div className="games">
      <ul className="games__list">
        <li className="games__item">
          <Link className="games__link" to="./speedmatch">
            <div className="games__logo">
              <img className="games__image" src={speedMatch} alt="speedMatch" />
            </div>
            <div className="games__about">
              <div className="games__brainArea">
                {t('SpeedMatch.brainArea')}
              </div>
              <div className="games__name">Speed Match</div>
              <div className="games__type">{t('SpeedMatch.type')}</div>
            </div>
          </Link>
        </li>
        <li className="games__item">
          <Link className="games__link" to="./memorymatch">
            <div className="games__logo">
              <img
                className="games__image"
                src={memoryMatch}
                alt="memoryMatch"
              />
            </div>
            <div className="games__about">
              <div className="games__brainArea">
                {t('MemoryMatch.brainArea')}
              </div>
              <div className="games__name">Memory Match</div>
              <div className="games__type">{t('MemoryMatch.type')}</div>
            </div>
          </Link>
        </li>
        <li className="games__item">
          <Link className="games__link" to="./memorymatrix">
            <div className="games__logo">
              <img
                className="games__image"
                src={memoryMatrix}
                alt="memoryMatrix"
              />
            </div>
            <div className="games__about">
              <div className="games__brainArea">
                {t('MemoryMatrix.brainArea')}
              </div>
              <div className="games__name">Memory Matrix</div>
              <div className="games__type">{t('MemoryMatrix.type')}</div>
            </div>
          </Link>
        </li>
        <li className="games__item">
          <Link className="games__link" to="./rotationmatrix">
            <div className="games__logo">
              <img
                className="games__image"
                src={rotationMatrix}
                alt="rotationMatrix"
              />
            </div>
            <div className="games__about">
              <div className="games__brainArea">
                {t('RotationMatrix.brainArea')}
              </div>
              <div className="games__name">Rotation Matrix</div>
              <div className="games__type">{t('RotationMatrix.type')}</div>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}
