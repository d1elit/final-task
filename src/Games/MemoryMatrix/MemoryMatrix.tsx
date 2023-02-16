import './MemoryMatrix.scss';

import React, { useState } from 'react';
import StartGame from '../../components/StartGame/StartGame';
import GameStats from '../../components/GameStats/GameStats';
import Board from './components/Board/Board';
import Tile from './components/Tile/Tile';

export default function MemoryMatrix() {
  const [isGame, setIsGame] = useState(false);
  const [isTutorial, setIsTutorial] = useState();
  const [isPause, setIsPause] = useState(false);

  const [isStarted, setIsStarted] = useState(false);
  const [isGameEnd, setIsGameEnd] = useState(false);

  const [tiles, setTiles] = useState(3);
  const [trial, setTrial] = useState(1);
  const [score, setScore] = useState(0);

  const [isSuccess, setIsSuccess] = useState(true);

  const init = () => {
    setIsStarted(true);
    setIsGameEnd(false);
    setIsPause(false);
  };

  const gameDescription =
    'Train your spatial recall by remembering the pattern of tiles';

  const boardSizes: Map<number, { w: number; h: number }> = new Map([
    [1, { w: 2, h: 2 }],
    [2, { w: 2, h: 2 }],
    [3, { w: 3, h: 3 }],
    [4, { w: 4, h: 3 }],
    [5, { w: 4, h: 4 }],
    [6, { w: 5, h: 4 }],
    [7, { w: 5, h: 5 }],
    [8, { w: 6, h: 5 }],
    [9, { w: 6, h: 6 }],
    [10, { w: 6, h: 6 }],
    [11, { w: 6, h: 6 }],
    [12, { w: 6, h: 6 }],
    [13, { w: 6, h: 6 }],
    [14, { w: 6, h: 6 }],
    [15, { w: 6, h: 6 }],
    [16, { w: 6, h: 6 }],
    [17, { w: 6, h: 6 }],
    [18, { w: 6, h: 6 }],
    [19, { w: 7, h: 6 }],
    [20, { w: 7, h: 6 }],
    [21, { w: 7, h: 6 }],
    [22, { w: 8, h: 6 }],
    [23, { w: 8, h: 6 }],
    [24, { w: 8, h: 6 }],
    [25, { w: 9, h: 6 }],
    [26, { w: 9, h: 6 }],
    [27, { w: 9, h: 6 }],
    [28, { w: 10, h: 6 }],
    [29, { w: 10, h: 6 }],
    [30, { w: 10, h: 6 }],
  ]);

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
          <Board tiles={tiles} boardSizes={boardSizes} />
          <div style={{ width: '100%' }}>
            <button
              onClick={() => setTiles(tiles > 1 ? tiles - 1 : tiles)}
              style={{ margin: '10px auto', width: '50px', height: '30px' }}
            >
              - tile
            </button>
            <button
              onClick={() => setTiles(tiles < 30 ? tiles + 1 : tiles)}
              style={{ margin: '10px auto', width: '50px', height: '30px' }}
            >
              + tile
            </button>
          </div>

          <div className="memory-matrix__message">
            Keep clicking. You can uncover {tiles} more tile
            {tiles > 1 ? 's' : ''}.
          </div>
        </>
      )}
    </div>
  );
}
