/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-var-requires */
import succesSound from '../../assets/sounds/success.mp3';
import failureSound from '../../assets/sounds/failure.wav';
import timerSound from '../../assets/sounds/timerSound.mp3';
import React, { useState, useEffect, useRef } from 'react';
import Controls from '../../components/Controls/Controls';
import StartGame from '../../components/StartGame/StartGame';
import Cards from './components/Cards/Cards';
import GameStats from '../../components/GameStats/GameStats';
import './SpeedMatch.scss';
import AnswerIndicator from '../../components/AnswerIndicator/AnswerIndicator';
import Results from '../../components/Results/Results';
import circle from '../../assets/images/shapes/circle.png';
import rectangle from '../../assets/images/shapes/rectangle.png';
import triangle from '../../assets/images/shapes/triangle.png';
import rhombus from '../../assets/images/shapes/rhombus.png';
import quatrefoil from '../../assets/images/shapes/quatrefoil.png';
import StartGameTimer from '../../components/StartGameTimer/StartGameTimer';

const gameDescription =
  'In Speed Match you only need to determine if the symbols are the same.';

interface IShapes {
  shapeName: string;
  shapeImg: string;
}

const shapes = [
  { shapeName: 'rectangle', shapeImg: rectangle },
  { shapeName: 'circle', shapeImg: circle },
  { shapeName: 'triangle', shapeImg: triangle },
  { shapeName: 'rhombus', shapeImg: rhombus },
  { shapeName: 'quatrefoil', shapeImg: quatrefoil },
];

const getNextCard = () => {
  return shapes[Math.floor(Math.random() * shapes.length)];
};

export default function SpeedMatch() {
  const [isStarted, setIsStarted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [isAnswerGetted, setIsAnswerGetted] = useState(false);
  const [currentCard, setCurrentCard] = useState<IShapes>({
    shapeName: 'rectangle',
    shapeImg: rectangle,
  });
  const [streak, setStreak] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [score, setScore] = useState(0);
  const [gameTimer, setGameTimer] = useState(45);
  const [isGameEnd, setIsGameEnd] = useState(false);
  const [answersCount, setAnswersCount] = useState(0);
  const [rightAnswersCount, setRightAnswersCount] = useState(0);
  const multiplierTemp = useRef(1);
  const gameEndTemp = useRef(false);
  const prevCard = useRef('');
  const [startGameTimer, setStartGameTimer] = useState(3);
  const isStartTimerEnd = useRef(false);

  const changeMultiplayer = (isRightAnswer: boolean, streak: number) => {
    if (isRightAnswer && streak == 4) {
      setMultiplier(prev => {
        multiplierTemp.current = prev + 1;
        return multiplierTemp.current;
      });
      setStreak(0);
    }
    if (!isRightAnswer && streak == 0) {
      setMultiplier(prev => {
        return prev === 1 ? prev : prev - 1;
      });
    }
  };

  const changeScore = (isSuccess: boolean) => {
    if (isSuccess) {
      setRightAnswersCount(prev => prev + 1);
      setScore(prev => prev + 50 * multiplierTemp.current);
      setStreak(prev => {
        changeMultiplayer(true, prev);
        return prev + 1;
      });
      return;
    }
    setStreak(prev => {
      changeMultiplayer(false, prev);
      return 0;
    });
  };

  const handleAnswer = (isRightAnswer: boolean) => {
    changeScore(isRightAnswer);
    setIsSuccess(isRightAnswer);
    isRightAnswer
      ? new Audio(succesSound).play()
      : new Audio(failureSound).play();
  };

  const chekIsRightAnswer = (key: string, current: string, prev: string) => {
    setAnswersCount(prev => prev + 1);
    if (current === prev && key === 'ArrowRight') {
      handleAnswer(true);
    }
    if (current !== prev && key === 'ArrowLeft') {
      handleAnswer(true);
    }
    if (current === prev && key === 'ArrowLeft') {
      handleAnswer(false);
    }
    if (current !== prev && key === 'ArrowRight') {
      handleAnswer(false);
    }
  };

  const setEndOfGame = (isGameEnd: boolean) => {
    setIsGameEnd(isGameEnd);
    gameEndTemp.current = isGameEnd;
  };

  const handleUserMove = (key: string) => {
    document
      .querySelector('.cards__field-previous')
      ?.classList.add('cards__field-previous_used');
    setCurrentCard(currentCard => {
      setIsAnswerGetted(true);
      chekIsRightAnswer(key, currentCard.shapeName, prevCard.current);
      prevCard.current = currentCard.shapeName;
      const newCurrent = getNextCard();
      return newCurrent;
    });
  };

  const onKeyControlsHandler = (event: KeyboardEvent) => {
    const key = event.key;
    if (gameEndTemp.current || !isStartTimerEnd.current) return;
    if (key === 'ArrowRight' || key === 'ArrowLeft') {
      handleUserMove(key);
    }
  };

  const startTimer = () => {
    const interval = setInterval(() => {
      setGameTimer(prevTimer => {
        if (prevTimer === 0) {
          clearInterval(interval);
          setEndOfGame(true);
          setIsStarted(false);
          return 0;
        } else {
          return prevTimer - 1;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  };

  const startGameTimerHandle = () => {
    new Audio(timerSound).play();
    const timer = setInterval(() => {
      setStartGameTimer(prev => {
        if (prev !== 1) new Audio(timerSound).play();
        return prev - 1;
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      isStartTimerEnd.current = true;
      startTimer();
    }, 3000);
  };

  const onPlayHandler = () => {
    setIsStarted(true);
    startGameTimerHandle();
  };

  const onRetryHandler = () => {
    setEndOfGame(false);
    setIsStarted(true);
    setScore(0);
    setMultiplier(1);
    setStreak(0);
    setAnswersCount(0);
    setRightAnswersCount(0);
    setGameTimer(45);
    setStartGameTimer(3);
    isStartTimerEnd.current = false;
    multiplierTemp.current = 1;
    setIsAnswerGetted(false);
    startGameTimerHandle();
    setCurrentCard({ shapeName: 'rectangle', shapeImg: rectangle });
    document
      .querySelector('.cards__field-previous')
      ?.classList.toggle('cards__field-previous_used');
  };

  const onBtnCountrolsHandler = (e: Event) => {
    const elem = (e.target as HTMLElement).closest('.controls__control');
    if (elem) {
      handleUserMove(elem.id);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyControlsHandler);
    document.addEventListener('click', onBtnCountrolsHandler);
  }, []);

  return (
    <div className="speed-match">
      {!isStarted && !isGameEnd && (
        <StartGame
          title="SpeedMatch"
          description={gameDescription}
          onPlayHandler={onPlayHandler}
        />
      )}
      {isStarted && (
        <>
          {startGameTimer !== 0 ? (
            <StartGameTimer timerValue={startGameTimer} />
          ) : (
            false
          )}
          <GameStats
            score={score}
            streak={streak}
            multiplier={multiplier}
            timer={gameTimer}
          />
          <h2 className="speed-match__title">
            Does the CURRENT card match the card that came IMMEDIATELY BEFORE
            it?
          </h2>
          <Cards currentCard={currentCard.shapeImg} />
          {isAnswerGetted && <AnswerIndicator isSuccess={isSuccess} />}
          <Controls />
        </>
      )}
      {isGameEnd && (
        <Results
          score={score}
          correct={rightAnswersCount}
          count={answersCount}
          onRetryHandler={onRetryHandler}
        />
      )}
    </div>
  );
}
