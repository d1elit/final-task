import React from 'react'
import './Controls.scss'

export default function Controls() {
  return (
    <div className='controls'>
      <div className='controls__control'>
        <span className='controls__name'>No</span>
        <span className='controls__direction controls__direction_reverse'>
          ➦
        </span>
      </div>
      <div className='controls__control'>
        <span className='controls__direction'>➦</span>
        <span className='controls__name'>Yes</span>
      </div>
    </div>
  )
}
