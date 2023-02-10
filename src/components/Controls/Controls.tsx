import React from 'react';
import './Controls.scss';

export default function Controls() {
  return (
    <div className="controls">
      <button className="controls__control" id="ArrowLeft">
        <span className="controls__name">No</span>
        <span className="controls__direction controls__direction_reverse">
          ➦
        </span>
      </button>
      <button className="controls__control" id="ArrowRight">
        <span className="controls__direction">➦</span>
        <span className="controls__name">Yes</span>
      </button>
    </div>
  );
}
