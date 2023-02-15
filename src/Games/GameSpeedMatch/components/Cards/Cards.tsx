import React from 'react';
import Card from '../../../../components/Card/Card';
import './Cards.scss';
type Props = {
  currentCard: string;
  secondCard: string;
};

export default function Cards({ currentCard, secondCard }: Props) {
  return (
    <div className="cards">
      <div className="cards__card-field cards__field-previous">
        <Card shapeImg={secondCard} />
      </div>
      <div className="cards__card-field cards__field-current">
        <Card shapeImg={currentCard} />
      </div>
      {/* <Card figure={'hello'}/>
      <Card figure={'hello'}/> */}
    </div>
  );
}
