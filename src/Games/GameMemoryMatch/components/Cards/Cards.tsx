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
    <div className="cards-memory">
      <div className="cards-memory__card-field cards-memory__field-previous cards-memory__prevPrev">
        <Card shapeImg={thirdCard} />
      </div>
      <div className="cards-memory__card-field cards-memory__field-previous cards-memory__prev">
        <Card shapeImg={secondCard} />
      </div>
      <div className="cards-memory__card-field cards-memory__field-current">
        <Card shapeImg={currentCard} />
      </div>
    </div>
  );
}
