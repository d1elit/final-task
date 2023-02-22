import Board from './components/Board/Board';
import cn from 'classnames';
import GameStats from '../../components/GameStats/GameStats';
import HowToPlayMemoryMatrix from './components/HowToPlayMemoryMatrix/HowToPlayMemoryMatrix';
import React, { useEffect, useState } from 'react';
import Results from '../../components/Results/Results';
import StartGame from '../../components/StartGame/StartGame';
import { getEndOfWord } from '../../utils/endOfWord';
import { useTranslation } from 'react-i18next';
import './MemoryMatrix.scss';
import HowToPlayDone, {
  TypeConfirm,
} from '../../components/HowToPlayDone/HowToPlayDone';

import moveBgPath from '../../assets/sounds/matrix/moveBg.mp3';

const TILES_DEFAULT = 3;
const TRIAL_DEFAULT = 1;
const SCORE_DEFAULT = 0;

const BEST_BOARD_DEFAULT = 3;

const ADD_SCORE = 250;
const BONUS_MULTIPLIER = 100;

const TIMER_COINS = 10;
const TIMER_STEP = 50;
const moveBg = new Audio(moveBgPath);

export default function MemoryMatrix() {
  const { i18n, t } = useTranslation();

  // const [isGameMode, setIsGameMode] = useState(true);
  const [isTutorial, setIsTutorial] = useState(false);
  const [isHowToPlayDone, setIsHowToPlayDone] = useState(false);
  const [isPause, setIsPause] = useState(false);

  const [isStarted, setIsStarted] = useState(false);
  const [isGameEnd, setIsGameEnd] = useState(false);

  const [tiles, setTiles] = useState(TILES_DEFAULT);
  const [trial, setTrial] = useState(TRIAL_DEFAULT);
  const [score, setScore] = useState(SCORE_DEFAULT);

  const [lastBoard, setLastBoard] = useState(TILES_DEFAULT);
  const [bestBoard, setBestBoard] = useState(BEST_BOARD_DEFAULT);
  const [tilesLeft, setTilesLeft] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  const [tutorialMessage, setTutorialMessage] = useState('');

  const initGame = () => {
    setIsStarted(true);
    setIsGameEnd(false);
    setIsPause(false);
    setIsHowToPlayDone(false);
    // setIsGameMode(true);
    setIsTutorial(false);
    setTiles(() => TILES_DEFAULT);
    setTrial(() => TRIAL_DEFAULT);
    setScore(() => SCORE_DEFAULT);
  };

  // === initTutorial ===
  const onHowToPlayHandler = () => {
    setIsTutorial(true);

    setTiles(() => 2);
    setIsStarted(true);
    setIsGameEnd(false);
    setIsPause(false);
  };

  const gameDescription = t('MemoryMatrix.description');
  const tutorialMessage1 = t('MemoryMatrix.howToPlay.message1');
  const tutorialMessage2 = t('MemoryMatrix.howToPlay.message2');

  function addScore() {
    setScore(prev => prev + ADD_SCORE);
  }

  function addBonusScore() {
    setScore(prev => prev + tiles * BONUS_MULTIPLIER);
    // console.log('анимация бонуса');
  }

  function endTutorial() {
    setIsStarted(true);
    setIsHowToPlayDone(true);
    // initGame();
  }

  function refreshBestBoard() {
    if (tiles > bestBoard) {
      setBestBoard(tiles);
    }
  }

  function gameMessage(tapsDone: number, tapsSuccess: number) {
    if (tapsDone === tapsSuccess) {
      setTilesLeft(() => 0);
      return;
    } else if (tapsDone < tiles && tapsDone > 0) {
      setTilesLeft(() => tiles - tapsDone);
    } else {
      setTilesLeft(() => 0);
    }
  }

  function tutorMessage(levelState: string) {
    isTutorial && setTutorialMessage(levelState);
  }

  function onRetryHandler() {
    initGame();
  }

  useEffect(() => {
    if (isStarted) {
      void moveBg.play();
    }
  }, [isStarted]);

  return (
    <div className="memory-matrix">
      {!isStarted && !isGameEnd && (
        <StartGame
          title="Memory Matrix"
          colorStyle={'memory-matrix'}
          description={gameDescription}
          onPlayHandler={initGame}
          onHowToPlayHandler={onHowToPlayHandler}
        />
      )}
      {isStarted && !isGameEnd && !isHowToPlayDone && (
        <>
          {!isTutorial && (
            <GameStats
              tiles={tiles}
              trial={trial}
              score={score}
              colorStyle={'memory-matrix'}
            />
          )}
          <Board
            tiles={tiles}
            setTiles={setTiles}
            trial={trial}
            setTrial={setTrial}
            addScore={addScore}
            addBonusScore={addBonusScore}
            gameMessage={gameMessage}
            tutorMessage={tutorMessage}
            endTutorial={endTutorial}
            isTutorial={isTutorial}
            setIsGameEnd={setIsGameEnd}
            refreshBestBoard={refreshBestBoard}
          />

          <div className="matrix__after-board">
            {isTutorial && (
              <div className="memory-matrix__tutorial-message_loading">
                {tutorialMessage === 'loading' && tutorialMessage1}
              </div>
            )}

            {isTutorial && (
              <div className="memory-matrix__tutorial-message_game">
                {tutorialMessage === 'game' && tutorialMessage2}
              </div>
            )}

            <div
              className={cn('memory-matrix__message', {
                ['memory-matrix__message_show']: tilesLeft > 0,
              })}
            >
              {`${t('MemoryMatrix.game.hintStart')} ${tilesLeft} ${t(
                'MemoryMatrix.gameHintEnd'
              )}${getEndOfWord(i18n.language, tilesLeft, 'ку', 'ки', 'ок')}`}
            </div>
          </div>
        </>
      )}
      {isHowToPlayDone && (
        <HowToPlayDone
          colorStyle={'memory-matrix'}
          onPlayHandler={initGame}
          typeConfirm={TypeConfirm.button}
        >
          <HowToPlayMemoryMatrix />
        </HowToPlayDone>
      )}
      {isGameEnd && (
        <Results
          score={score}
          bestBoard={bestBoard}
          colorStyle={'memory-matrix'}
          onRetryHandler={onRetryHandler}
          gameName="Memory Matrix"
        />
      )}
    </div>
  );
}
