import React from 'react'
import Card from '../../../../components/Card/Card'
import './Cards.scss'
type Props = {
  currentCard: string
}

export default function Cards({ currentCard }: Props) {
  return (
    <div className='cards'>
      <div className='cards__card-field cards__field-previous'></div>
      <div className='cards__card-field'>
        <Card shapeImg={currentCard} />
      </div>
      {/* <Card figure={'hello'}/>
      <Card figure={'hello'}/> */}
    </div>
  )
}
