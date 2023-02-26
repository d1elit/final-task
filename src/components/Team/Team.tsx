import { useTranslation } from 'react-i18next';
import './Team.scss';

export default function Team() {
  const { t } = useTranslation();

  return (
    <div className="team">
      <ul className="team__list">
        <li className="team__item">
          <div className="team__member member">
            <div className="member__left-side">
              <div className="member__logo member__logo_artem"></div>
              <div className="member__name member__name_artem">
                {t('team.artem.name')}
              </div>
            </div>
            <div className="member__right-side">
              <div className="member_about">
                <h3 className="member__right-side_title">
                  {t('team.artem.name')} - {t('team.artem.role')}
                  <a
                    className="member__git"
                    href="https://github.com/d1elit"
                    target="_blank"
                  ></a>
                </h3>
                <p className="member__right-side_p">{t('team.artem.p1')}</p>
                <p className="member__right-side_p">{t('team.artem.p2')}</p>
                <p className="member__right-side_p">{t('team.artem.p3')}</p>
              </div>
            </div>
          </div>
        </li>
        <li className="team__item">
          <div className="team__member member">
            <div className="member__left-side">
              <div className="member__logo member__logo_sedrak"></div>
              <div className="member__name member__name_sedrak">
                {t('team.sedrak.name')}
              </div>
            </div>
            <div className="member__right-side">
              <div className="member_about">
                <h3 className="member__right-side_title">
                  {t('team.sedrak.name')} - {t('team.sedrak.role')}
                  <a
                    className="member__git"
                    href="https://github.com/DefK1lla"
                    target="_blank"
                  ></a>
                </h3>
                <p className="member__right-side_p">{t('team.sedrak.p1')}</p>
                <p className="member__right-side_p">{t('team.sedrak.p2')}</p>
                <p className="member__right-side_p">{t('team.sedrak.p3')}</p>
              </div>
            </div>
          </div>
        </li>
        <li className="team__item">
          <div className="team__member member">
            <div className="member__left-side">
              <div className="member__logo member__logo_evgenii"></div>
              <div className="member__name member__name_evgenii">
                {t('team.evgenii.name')}
              </div>
            </div>
            <div className="member__right-side">
              <div className="member_about">
                <h3 className="member__right-side_title">
                  {t('team.evgenii.name')} - {t('team.evgenii.role')}
                  <a
                    className="member__git"
                    href="https://github.com/EvgeniiKolesnikov"
                    target="_blank"
                  ></a>
                </h3>
                <p className="member__right-side_p">{t('team.evgenii.p1')}</p>
                <p className="member__right-side_p">{t('team.evgenii.p2')}</p>
                <p className="member__right-side_p">{t('team.evgenii.p3')}</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
