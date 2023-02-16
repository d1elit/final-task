import React from 'react';
import { LocalText } from '../../types/localisationTypes';
import { getLang } from '../../utils/localisationUtils';
import './Controls.scss';

const controlNoText: LocalText = { eng: 'No', rus: 'Нет' };
const controlYesText: LocalText = { eng: 'Yes', rus: 'Да' };

export default function Controls() {
  return (
    <div className="controls">
      <button className="controls__control" id="ArrowLeft">
        <span className="controls__name">{controlNoText[getLang()]}</span>
        <span className="controls__direction controls__direction_reverse">
          ➦
        </span>
      </button>
      <button className="controls__control" id="ArrowRight">
        <span className="controls__direction">➦</span>
        <span className="controls__name">{controlYesText[getLang()]}</span>
      </button>
    </div>
  );
}
