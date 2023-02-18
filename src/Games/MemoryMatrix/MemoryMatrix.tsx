import './MemoryMatrix.scss';

import React, { useState } from 'react';
import StartGame from '../../components/StartGame/StartGame';
import GameStats from '../../components/GameStats/GameStats';
import Board from './components/Board/Board';
import Tile from './components/Tile/Tile';

// export type BoardType = {
//   board: string[];
//   setBoard: React.Dispatch<React.SetStateAction<string[]>>;
// };

// type BoardState = [string[], React.Dispatch<React.SetStateAction<string[]>>];

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

  const [board, setBoard] = useState<string[]>([]);

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
          />

          <div className="memory-matrix__message">
            Keep clicking. You can uncover {tiles} more tile
            {tiles > 1 ? 's' : ''}.
          </div>
        </>
      )}
    </div>
  );
}
