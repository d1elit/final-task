import React from 'react';
import './Card.scss';
interface Props {
  shapeImg: string;
}

export default function Card({ shapeImg }: Props) {
  return (
    <div className="card">
      <div className="card__figure">
        <img src={shapeImg} alt="" />
      </div>
    </div>
  );
}
