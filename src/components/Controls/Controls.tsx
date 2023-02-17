import React from 'react';
import { useTranslation } from 'react-i18next';
import './Controls.scss';

export default function Controls() {
  const { t } = useTranslation();
  return (
    <div className="controls">
      <button className="controls__control" id="ArrowLeft">
        <span className="controls__name">{t('controls.no')}</span>
        <span className="controls__direction controls__direction_reverse">
          ➦
        </span>
      </button>
      <button className="controls__control" id="ArrowRight">
        <span className="controls__direction">➦</span>
        <span className="controls__name">{t('controls.yes')}</span>
      </button>
    </div>
  );
}
