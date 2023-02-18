import './MemoryMatrix.scss';
import Board from './components/Board/Board';
import GameStats from '../../components/GameStats/GameStats';
import React, { useState } from 'react';
import StartGame from '../../components/StartGame/StartGame';
import Tile from './components/Tile/Tile';
import cn from 'classnames';

const ADD_SCORE = 250;
const BONUS_MULTIPLIER = 100;

export default function MemoryMatrix() {
  const [isGameMode, setIsGameMode] = useState(true);
  const [isTutorial, setIsTutorial] = useState();
  const [isPause, setIsPause] = useState(false);

  const [isStarted, setIsStarted] = useState(false);
  const [isGameEnd, setIsGameEnd] = useState(false);

  const [tiles, setTiles] = useState(3);
  const [trial, setTrial] = useState(1);
  const [score, setScore] = useState(0);
  const [isSuccess, setIsSuccess] = useState(true);

  const [message, setMessage] = useState('');

  const init = () => {
    setIsStarted(true);
    setIsGameEnd(false);
    setIsPause(false);
  };

  const gameDescription =
    'Train your spatial recall by remembering the pattern of tiles';

  function addScore() {
    setScore(prev => prev + ADD_SCORE);
  }

  function addBonusScore() {
    setScore(prev => prev + tiles * BONUS_MULTIPLIER);
    // console.log('анимация бонуса');
  }

  function gameMessage(tapsDone: number, tapsSuccess: number) {
    isGameMode &&
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

  return (
    <div className="memory-matrix">
      {!isStarted && !isGameEnd && (
        <StartGame
          title="Memory Matrix"
          colorStyle={'memory-matrix'}
          description={gameDescription}
          onPlayHandler={init}
        />
      )}

      {isStarted && (
        <>
          <GameStats
            tiles={tiles}
            trial={trial}
            score={score}
            colorStyle={'memory-matrix'}
          />
          <Board
            tiles={tiles}
            setTiles={setTiles}
            trial={trial}
            setTrial={setTrial}
            addScore={addScore}
            addBonusScore={addBonusScore}
            gameMessage={gameMessage}
          />

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
