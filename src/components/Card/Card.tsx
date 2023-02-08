import React from 'react'
import './Card.scss'

interface Props {
  figure: string
}

export default function Card({ figure }: Props) {
  return (
    <div className='card'>
      <div className='card__figure'>{figure}</div>
    </div>
  )
}
