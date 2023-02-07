const succesSound = require('../../assets/sounds/success.mp3')
const failureSound = require('../../assets/sounds/failure.mp3')
import React, { useState ,useEffect, useRef} from 'react'
import Controls from '../../components/Controls/Controls'
import StartGame from '../../components/StartGame/StartGame'
import Cards from './components/Cards/Cards'
import GameStats from '../../components/GameStats/GameStats'
import './SpeedMatch.scss'
import AnswerIndicator from '../../components/AnswerIndicator/AnswerIndicator'
import Results from '../../components/Results/Results'

const gameDescription = 'In Speed Match you only need to determine if the symbols are the same.'
const figures = ['rectangle', 'triangle', 'circle']

const getNextCard = () => {  
  return figures[Math.floor(Math.random()*figures.length)];
}


export default function SpeedMatch() { 
  const [isStarted, setIsStarted] = useState(false)
  const [isSuccess, setIsSuccess] = useState(true)
  const [isAnswerGetted, setIsAnswerGetted] = useState(false)
  const [currentCard, setCurrentCard] = useState('rectangle') 
  const [streak, setStreak] = useState(0) 
  const [multiplier, setMultiplier] = useState(1) 
  const [score, setScore] = useState(0)
  const [timer, setTimer] = useState(45)
  const multiplierTemp = useRef(1)
  const prevCard = useRef('')
  const [isGameEnd, setIsGameEnd] = useState(false)
  const [answersCount, setAnswersCount]= useState(0)
  const [rightAnswersCount, setRightAnswersCount]= useState(0)
  
  const changeMultiplayer = (isRightAnswer: boolean, streak: number) => {  
    if(isRightAnswer && streak == 4) {    
      setMultiplier(prev => {
        multiplierTemp.current = prev + 1
        return  multiplierTemp.current})
      setStreak(0)
    }
    if(!isRightAnswer && streak == 0) {
      setMultiplier(prev => {
        return prev === 1 ? prev : prev -1
      })
    }
  }

  
  const changeScore = (isSuccess: boolean) => {   
    if(isSuccess) {
      setRightAnswersCount(prev => prev + 1 )
      setScore(prev => prev + (50 *  multiplierTemp.current))
      setStreak(prev => 
          {
            changeMultiplayer(true, prev)
            return prev + 1
          }
        )      
      return
    }
    setStreak(prev => {
      changeMultiplayer(false, prev)
      return 0
    })  
   
  }

  const handleAnswer = (isRightAnswer: boolean) => {
    changeScore(isRightAnswer)
    setIsSuccess(isRightAnswer)    
    isRightAnswer ? new Audio(succesSound).play() : new Audio(failureSound).play()     
   
  }

  const chekIsRightAnswer = (event: KeyboardEvent, current:string, prev:string) => {
    setAnswersCount(prev => prev + 1)
    if(current === prev && event.key === 'ArrowRight') {   
      handleAnswer(true)   
    }
    if(current !== prev && event.key === 'ArrowLeft') {       
      handleAnswer(true)    
    }
    if(current === prev && event.key === 'ArrowLeft') {   
      handleAnswer(false)     
    }
    if(current !== prev && event.key === 'ArrowRight') {           
      handleAnswer(false)    
    }        
  }

  const onControlsHandler = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight' || (event.key === 'ArrowLeft' && !isGameEnd)) {      
      document.querySelector('.cards__field-previous')?.classList.add('cards__field-previous_used')  
      setCurrentCard( (currentCard) => {      
        setIsAnswerGetted(true) 
        chekIsRightAnswer(event, currentCard,  prevCard.current)       
        prevCard.current = currentCard  
        let newCurrent = getNextCard()        
        return newCurrent
       });       
    }
  }

  const onPlayHandler = () => {
    setIsStarted(true)    
    startTimer()
  }


  const startTimer = () => {
    const interval = setInterval(() => {
      setTimer(prevTimer => {       
        if (prevTimer === 0) {
          clearInterval(interval);  
          setIsGameEnd(true)        
          setIsStarted(false)
          return 0
        } else {
          return prevTimer - 1;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }

  const onRetryHandler = () => {
    setIsGameEnd(false)        
    setIsStarted(true)
    setScore(0)
    setMultiplier(1)
    setStreak(0)  
    setAnswersCount(0)
    setRightAnswersCount(0)
    setTimer(45)
    multiplierTemp.current = 1
    setIsAnswerGetted(false)
    startTimer()
    setCurrentCard('rectangle')
    document.querySelector('.cards__field-previous')?.classList.toggle('cards__field-previous_used')  

  }


  useEffect(() => {
   
    document.addEventListener('keydown',onControlsHandler);    
  }, []);


  return (
    <div className='speed-match'>
     {!isStarted && !isGameEnd &&
       <StartGame 
          title='SpeedMatch' 
          description={gameDescription}
          onPlayHandler={onPlayHandler}      
        />
      }
      {isStarted && 
        <>
          <GameStats score = {score} streak = {streak} multiplier = {multiplier} timer = {timer}/>
          <h2 className='speed-match__title'>Does the CURRENT card match the card that came IMMEDIATELY BEFORE it?</h2>
          <Cards currentCard={currentCard}/>           
          { isAnswerGetted &&  <AnswerIndicator isSuccess = {isSuccess}/>    }  
          <Controls/>
        </>
      }
      {        
        isGameEnd && <Results score={score} correct={rightAnswersCount} count={answersCount} onRetryHandler={onRetryHandler}/>
      }
    </div>
  )
}
