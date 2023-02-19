import './MemoryMatrix.scss';
import Board from './components/Board/Board';
import GameStats from '../../components/GameStats/GameStats';
import React, { useState } from 'react';
import StartGame from '../../components/StartGame/StartGame';
import cn from 'classnames';

const TILES_DEFAULT = 3;
const TRIAL_DEFAULT = 1;
const SCORE_DEFAULT = 0;
const ADD_SCORE = 250;
const BONUS_MULTIPLIER = 100;
const TIMER_COINS = 10;
const TIMER_STEP = 50;

export default function MemoryMatrix() {
  const [isGameMode, setIsGameMode] = useState(true);
  const [isTutorial, setIsTutorial] = useState(false);
  const [isPause, setIsPause] = useState(false);

  const [isStarted, setIsStarted] = useState(false);
  const [isGameEnd, setIsGameEnd] = useState(false);

  const [tiles, setTiles] = useState(TILES_DEFAULT);
  const [trial, setTrial] = useState(TRIAL_DEFAULT);
  const [score, setScore] = useState(SCORE_DEFAULT);

  const [bestBoard, setBestBoard] = useState(TILES_DEFAULT);
  const [lastBoard, setLastBoard] = useState(TILES_DEFAULT);

  const [message, setMessage] = useState('');
  const [tutorialMessage, setTutorialMessage] = useState('');

  const initGame = () => {
    setIsStarted(true);
    setIsGameEnd(false);
    setIsPause(false);

    setIsGameMode(true);
    setIsTutorial(false);
    setTiles(() => TILES_DEFAULT);
    setTrial(() => TRIAL_DEFAULT);
    setScore(() => SCORE_DEFAULT);
  };

  const initTutorial = () => {
    setTiles(prev => 2);
    setIsStarted(true);
    setIsGameEnd(false);
    setIsPause(false);

    setIsGameMode(false);
    setIsTutorial(true);
  };

  // const onHowToPlayHandler = () => {};

  const gameDescription =
    'Train your spatial recall by remembering the pattern of tiles';
  const tutorialMessage1 = 'Remember the highlighted tiles.';
  const tutorialMessage2 = 'Click the tiles to recreate the pattern.';

  function addScore() {
    setScore(prev => prev + ADD_SCORE);
  }

  function addBonusScore() {
    setScore(prev => prev + tiles * BONUS_MULTIPLIER);
    // console.log('анимация бонуса');
  }

  function endTutorial() {
    initGame();
  }

  function gameMessage(tapsDone: number, tapsSuccess: number) {
    setMessage(() => {
      if (tapsDone === tapsSuccess) {
        return '';
      } else if (tapsDone < tiles && tapsDone > 0) {
        const remains = tiles - tapsDone;
        return `Keep clicking. You can uncover ${remains} more tile${
          remains > 1 ? 's' : ' '
        }`;
      }
      return '';
    });
  }

  function tutorMessage(levelState: string) {
    isTutorial &&
      setTutorialMessage(() => {
        if (levelState === 'loading') {
          return tutorialMessage1;
        } else if (levelState === 'game') {
          return tutorialMessage2;
        }
        return '';
      });
  }

  return (
    <div className="memory-matrix">
      {!isStarted && !isGameEnd && (
        <StartGame
          title="Memory Matrix"
          colorStyle={'memory-matrix'}
          description={gameDescription}
          onPlayHandler={initGame}
          onHowToPlayHandler={initTutorial}
        />
      )}

      {isStarted && (
        <>
          <div style={isTutorial ? { opacity: '0' } : { opacity: '1' }}>
            <GameStats
              tiles={tiles}
              trial={trial}
              score={score}
              colorStyle={'memory-matrix'}
            />
          </div>
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
          />

          <div
            className={cn('memory-matrix__tutorial-message', {
              ['memory-matrix__tutorial-message_loading']:
                tutorialMessage === tutorialMessage1,
              ['memory-matrix__tutorial-message_game']:
                tutorialMessage === tutorialMessage2,
            })}
          >
            {isTutorial && tutorialMessage}
          </div>

          <div
            className={cn('memory-matrix__message', {
              ['memory-matrix__message_show']: message,
            })}
          >
            {message}
          </div>
        </>
      )}
    </div>
  );
}
