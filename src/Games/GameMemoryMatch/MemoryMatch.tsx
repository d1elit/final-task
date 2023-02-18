import succesSound from '../../assets/sounds/success.mp3';
import failureSound from '../../assets/sounds/failure.mp3';
import timerSound from '../../assets/sounds/timerSound.mp3';
import React, { useState, useEffect, useRef } from 'react';
import Controls from '../../components/Controls/Controls';
import StartGame from '../../components/StartGame/StartGame';
import Cards from './components/Cards/Cards';
import GameStats from '../../components/GameStats/GameStats';
import './MemoryMatch.scss';
import AnswerIndicator from '../../components/AnswerIndicator/AnswerIndicator';
import Results from '../../components/Results/Results';
import circle from '../../assets/images/shapes/circle.png';
import rectangle from '../../assets/images/shapes/rectangle.png';
import StartGameTimer from '../../components/StartGameTimer/StartGameTimer';
import cardBackground from '../../assets/images/shapes/card-background.jpg';
import { IShapes } from '../../types/MatchGamesTypes';
import { useTranslation } from 'react-i18next';
import { getNextCard, shapes } from '../../utils/matchGamesUtils';
import HowToPlay from '../../components/HowToPlay/HowToPlay';

const getShapeByName = (shapeName: string) => {
  let result: IShapes = { shapeName: '', shapeImg: '' };
  shapes.forEach(shape => {
    if (shape.shapeName === shapeName) result = shape;
  });
  return result;
};

export default function SpeedMatch() {
  const { t } = useTranslation();
  const [isStarted, setIsStarted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);
  const [isAnswerGetted, setIsAnswerGetted] = useState(false);
  const [currentCard, setCurrentCard] = useState<IShapes>({
    shapeName: 'rectangle',
    shapeImg: rectangle,
  });
  const [secondCard, setSecondCard] = useState<IShapes>({
    shapeName: 'circle',
    shapeImg: circle,
  });
  const [thirdCard, setThirdCard] = useState<IShapes>({
    shapeName: '',
    shapeImg: '',
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
  const prevCard = useRef('circle');
  const prevPrevCard = useRef('');
  const [startGameTimer, setStartGameTimer] = useState(3);
  const isStartTimerEnd = useRef(false);

  const setShapesToEmpty = () => {
    setSecondCard({ shapeName: '', shapeImg: cardBackground });
    setThirdCard({ shapeName: '', shapeImg: cardBackground });
  };

  const resetShapesToRestart = () => {
    setCurrentCard({ shapeName: 'rectangle', shapeImg: rectangle });
    setSecondCard({ shapeName: 'circle', shapeImg: circle });
    setThirdCard({ shapeName: '', shapeImg: '' });
  };

  const setShapesToStart = () => {
    setSecondCard({ shapeName: '', shapeImg: cardBackground });
    setThirdCard({ shapeName: '', shapeImg: cardBackground });
    prevPrevCard.current = 'circle';
    prevCard.current = 'rectangle';
    setCurrentCard(getNextCard());
    void new Audio(succesSound).play();
  };

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
    if (!isRightAnswer) {
      setSecondCard(getShapeByName(prevCard.current));
      setThirdCard(getShapeByName(prevPrevCard.current));
    }
    isRightAnswer
      ? void new Audio(succesSound).play()
      : void new Audio(failureSound).play();
  };

  const chekIsRightAnswer = (
    key: string,
    current: string,
    prev: string,
    prevPrev: string
  ) => {
    setAnswersCount(prev => prev + 1);
    if ((current === prev || current === prevPrev) && key === 'ArrowRight') {
      handleAnswer(true);
    }
    if (current !== prev && current !== prevPrev && key === 'ArrowLeft') {
      handleAnswer(true);
    }
    if ((current === prev || current === prevPrev) && key === 'ArrowLeft') {
      handleAnswer(false);
    }
    if (current !== prev && current !== prevPrev && key === 'ArrowRight') {
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
      setShapesToEmpty();
      setIsAnswerGetted(true);
      chekIsRightAnswer(
        key,
        currentCard.shapeName,
        prevCard.current,
        prevPrevCard.current
      );
      prevPrevCard.current = prevCard.current;
      prevCard.current = currentCard.shapeName;
      const newCurrent = getNextCard();
      return newCurrent;
    });
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
    void new Audio(timerSound).play();
    const timer = setInterval(() => {
      setStartGameTimer(prev => {
        if (prev !== 1) void new Audio(timerSound).play();
        return prev - 1;
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      isStartTimerEnd.current = true;
      startTimer();
      setShapesToStart();
    }, 3000);
  };

  const onPlayHandler = () => {
    setIsStarted(true);
    startGameTimerHandle();
  };
  const onPlayInHowToPlayHandler = () => {
    setIsHowToPlayOpen(false);
    onPlayHandler();
  };

  const onRetryHandler = () => {
    setEndOfGame(false);
    setIsStarted(true);
    setScore(0);
    setMultiplier(1);
    setStreak(0);
    setAnswersCount(0);
    setRightAnswersCount(0);
    resetShapesToRestart();
    setGameTimer(45);
    setStartGameTimer(3);
    isStartTimerEnd.current = false;
    multiplierTemp.current = 1;
    setIsAnswerGetted(false);
    startGameTimerHandle();
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

  const onKeyControlsHandler = (event: KeyboardEvent) => {
    const key = event.key;
    if (gameEndTemp.current || !isStartTimerEnd.current) return;
    if (key === 'ArrowRight' || key === 'ArrowLeft') {
      handleUserMove(key);
    }
  };
  const onHowToPlayHandler = () => {
    setIsHowToPlayOpen(true);
  };
  useEffect(() => {
    document.addEventListener('keydown', onKeyControlsHandler);
    document.addEventListener('click', onBtnCountrolsHandler);
  }, []);

  return (
    <div className="speed-match">
      {!isStarted && !isGameEnd && !isHowToPlayOpen && (
        <StartGame
          title="Memory Match"
          description={t('memoryMatch.description')}
          onPlayHandler={onPlayHandler}
          colorStyle={'speed-match'}
          onHowToPlayHandler={onHowToPlayHandler}
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
            colorStyle={'speed-match'}
          />

          <h2 className="speed-match__title">{t('memoryMatch.title')}</h2>

          <Cards
            currentCard={currentCard.shapeImg}
            secondCard={secondCard.shapeImg}
            thirdCard={thirdCard.shapeImg}
          />
          {isAnswerGetted && <AnswerIndicator isSuccess={isSuccess} />}
          <Controls />
        </>
      )}

      {isHowToPlayOpen ? (
        <HowToPlay
          gameRules={t('memoryMatch.howToPlay')}
          onPlayHandler={onPlayInHowToPlayHandler}
        />
      ) : (
        ''
      )}
      {isGameEnd && (
        <Results
          score={score}
          correct={rightAnswersCount}
          count={answersCount}
          colorStyle={'speed-match'}
          onRetryHandler={onRetryHandler}
          gameName="Memory Match"
        />
      )}
    </div>
  );
}
