import { is } from 'immer/dist/internal'
import React, { useState ,useEffect, useRef} from 'react'
import Controls from '../../components/Controls/Controls'
import StartGame from '../../components/StartGame/StartGame'
import Cards from './compoenents/Cards/Cards'
import GameStats from '../../components/GameStats/GameStats'
import './SpeedMatch.scss'

const gameDescription = 'In Speed Match you only need to determine if the symbols are the same.'
const figures = ['rectangle', 'triangle', 'circle']

const getNextCard = () => {  
  return figures[Math.floor(Math.random()*figures.length)];
}


export default function SpeedMatch() {
  const [isStarted, setIsStarted] = useState(false)
  const [currentCard, setCurrentCard] = useState('rectangle')
  const prevCard = useRef('')


  // const chekIsRightAnswer = (event: KeyboardEvent) => {
  //   if(currentCard === prevCard && event.key === 'ArrowRight') {
     
  //     console.log('Correct')
  //   }
  //   if(currentCard !== prevCard && event.key === 'ArrowLeft') {
     
  //     console.log('Correct')
  //   }
  //   if(currentCard === prevCard && event.key === 'ArrowLeft') {
     
  //     console.log('No')
  //   }
  //   if(currentCard !== prevCard && event.key === 'ArrowRight') {
   
  //     console.log('No')
  //   }   
     
  // }

  const onControlsHandler = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight' || (event.key === 'ArrowLeft')) {
      // document.querySelector('.cards__field-previous')?.classList.add('cards__field-previous_used')  
   
      // chekIsRightAnswer(event)   
      prevCard.current = currentCard  
      setCurrentCard(getNextCard());    
     
      console.log(`prev: ${prevCard.current} cur: ${currentCard}`)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown',onControlsHandler);
    
  }, []);

  const onPlayHandler = () => {
    setIsStarted(true)
  }

  return (
    <div className='speed-match'>
     {!isStarted && 
       <StartGame 
          title='SpeedMatch' 
          description={gameDescription}
          onPlayHandler={onPlayHandler}      
        />
      }
      {isStarted &&
        <>
          <GameStats/>
          <h2 className='speed-match__title'>Does the CURRENT card match the card that came IMMEDIATELY BEFORE it?</h2>
          <Cards currentCard={currentCard}/>         
          <Controls/>
        </>
      }
    </div>
  )
}
