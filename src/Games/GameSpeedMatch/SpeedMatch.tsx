import succesSoundPath from '../../assets/sounds/success.mp3';
import failureSoundPath from '../../assets/sounds/failure.mp3';
import timerSoundPath from '../../assets/sounds/timerSound.mp3';

import { useState, useEffect, useRef, useCallback } from 'react';
import Controls from '../../components/Controls/Controls';
import StartGame from '../../components/StartGame/StartGame';
import Cards from './components/Cards/Cards';
import GameStats from '../../components/GameStats/GameStats';
import './SpeedMatch.scss';
import AnswerIndicator from '../../components/AnswerIndicator/AnswerIndicator';
import Results from '../../components/Results/Results';
import StartGameTimer from '../../components/StartGameTimer/StartGameTimer';
import { IShapes } from '../../types/MatchGamesTypes';
import cardBackground from '../../assets/images/shapes/card-background.jpg';
import { useTranslation } from 'react-i18next';
import { getNextCard } from '../../utils/matchGamesUtils';
import rectangle from '../../assets/images/shapes/rectangle.png';
import HowToPlay from '../../components/HowToPlay/HowToPlay';

import scoreApi from '../../shared/api/score';

import type { SpeedMatchResult } from '../../shared/types/score';

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
  const prevCard = useRef('');
  const [startGameTimer, setStartGameTimer] = useState(3);
  const isStartTimerEnd = useRef(false);

  const [errorMessage, setErrorMessage] = useState<string>('');

  const saveResults = useCallback(() => {
    const results = {
      score,
      correct: `${rightAnswersCount}/${answersCount}`,
      accuracy: `${
        rightAnswersCount !== 0
          ? Math.round((rightAnswersCount / answersCount) * 100)
          : 0
      }%`,
    };

    try {
      void scoreApi.saveResults<SpeedMatchResult>('speed-match', results);
    } catch (e) {
      const err = e as Error;
      setErrorMessage(err.message);
    }
  }, [answersCount, rightAnswersCount, score]);

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

  const setShapesToStart = () => {
    setSecondCard({ shapeName: '', shapeImg: cardBackground });
    prevCard.current = 'rectangle';
    setCurrentCard(getNextCard());
    void new Audio(succesSoundPath).play();
  };

  const handleAnswer = (isRightAnswer: boolean) => {
    changeScore(isRightAnswer);
    setIsSuccess(isRightAnswer);
    isRightAnswer
      ? void new Audio(succesSoundPath).play()
      : void new Audio(failureSoundPath).play();
  };

  const chekIsRightAnswer = (key: string, current: string, prev: string) => {
    setAnswersCount(prev => prev + 1);
    if (current === prev && key === 'ArrowRight') {
      void handleAnswer(true);
    }
    if (current !== prev && key === 'ArrowLeft') {
      void handleAnswer(true);
    }
    if (current === prev && key === 'ArrowLeft') {
      void handleAnswer(false);
    }
    if (current !== prev && key === 'ArrowRight') {
      void handleAnswer(false);
    }
  };

  const setEndOfGame = (isGameEnd: boolean) => {
    setIsGameEnd(isGameEnd);
    gameEndTemp.current = isGameEnd;
  };

  const animate = () => {
    document.querySelector('.cards__field-current')?.classList.add('animate');
  };

  const handleUserMove = (key: string) => {
    document
      .querySelector('.cards__field-current')
      ?.classList.remove('animate');
    document
      .querySelector('.cards__field-previous')
      ?.classList.add('cards__field-previous_used');
    setCurrentCard(currentCard => {
      document.querySelector('.cards__field-current')?.classList.add('animate');
      setSecondCard({ shapeName: '', shapeImg: cardBackground });
      setIsAnswerGetted(true);
      chekIsRightAnswer(key, currentCard.shapeName, prevCard.current);
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
    void new Audio(timerSoundPath).play();
    const timer = setInterval(() => {
      setStartGameTimer(prev => {
        if (prev !== 1) {
          void new Audio(timerSoundPath).play();
        }
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
    setGameTimer(45);
    setStartGameTimer(3);
    isStartTimerEnd.current = false;
    multiplierTemp.current = 1;
    setIsAnswerGetted(false);
    startGameTimerHandle();
    setSecondCard({ shapeName: '', shapeImg: '' });
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

  useEffect(() => {
    if (isGameEnd) saveResults();
  }, [isGameEnd, saveResults]);

  return (
    <div className="speed-match">
      {!isStarted && !isGameEnd && !isHowToPlayOpen && (
        <StartGame
          title="Speed Match"
          colorStyle={'speed-match'}
          description={t('speedMatch.description')}
          onPlayHandler={onPlayHandler}
          onHowToPlayHandler={onHowToPlayHandler}
        />
      )}

      {isHowToPlayOpen ? (
        <HowToPlay
          gameRules={t('speedMatch.howToPlay')}
          onPlayHandler={onPlayInHowToPlayHandler}
        />
      ) : (
        ''
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
          <h2 className="speed-match__title">{t('speedMatch.title')}</h2>
          <Cards
            currentCard={currentCard.shapeImg}
            secondCard={secondCard.shapeImg}
          />
          {isAnswerGetted && <AnswerIndicator isSuccess={isSuccess} />}
          <Controls />
        </>
      )}
      {isGameEnd && (
        <Results
          score={score}
          correct={rightAnswersCount}
          count={answersCount}
          colorStyle={'speed-match'}
          onRetryHandler={onRetryHandler}
          gameName="Speed Match"
        />
      )}
    </div>
  );
}
