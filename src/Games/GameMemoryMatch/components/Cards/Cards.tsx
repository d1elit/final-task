import React from 'react';
import Card from '../../../../components/Card/Card';
import './Cards.scss';
type Props = {
  currentCard: string;
  secondCard: string;
  thirdCard: string;
};

export default function Cards({ currentCard, secondCard, thirdCard }: Props) {
  return (
    <div className="cards">
      <div className="cards__card-field cards__field-previous">
        <Card shapeImg={thirdCard} />
      </div>
      <div className="cards__card-field cards__field-previous">
        <Card shapeImg={secondCard} />
      </div>
      <div className="cards__card-field">
        <Card shapeImg={currentCard} />
      </div>
    </div>
  );
}
