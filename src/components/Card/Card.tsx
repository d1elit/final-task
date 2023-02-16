import React from 'react';
import './Card.scss';

interface Props {
  shapeImg: string;
}

export default function Card({ shapeImg }: Props) {
  return (
    <div className="card">
      {shapeImg !== '' ? (
        <div className="card__figure">
          <img src={shapeImg} alt="" />
        </div>
      ) : (
        <div className="card__figure card__figure_background">
          <img src={shapeImg} alt="" />
        </div>
      )}
    </div>
  );
}
