import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import Tile from '../Tile/Tile';
import './Board.scss';

interface BoardProps {
  tiles: number;
  setTiles: React.Dispatch<React.SetStateAction<number>>;
  trial: number;
  setTrial: React.Dispatch<React.SetStateAction<number>>;
  children?: JSX.Element;
}

const BOARD_ZOOM = 42;

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

const generateBoard = (tiles: number): string[] => {
  const boardSize = boardSizes.get(tiles);
  const boardWidth = boardSize?.w !== undefined ? boardSize.w : 3;
  const boardHeight = boardSize?.h !== undefined ? boardSize.h : 3;
  const boardTilesCount = boardWidth * boardHeight;

  const defaultBoardStyles: string[] = Array.from(
    { length: boardTilesCount },
    () => 'tile tile_default'
  );

  for (let i = 0; i < tiles; ) {
    const x = Math.floor(Math.random() * boardWidth);
    const y = Math.floor(Math.random() * boardHeight);
    const index = y * boardWidth + x;

    if (defaultBoardStyles[index] === 'tile tile_guess') {
      continue;
    }

    defaultBoardStyles[index] = 'tile tile_guess';
    i += 1;
  }
  return defaultBoardStyles;
};

// ============================================================================
// ============================================================================
// ============================================================================

export default function Board({
  tiles = 3,
  setTiles,
  trial = 1,
  setTrial,
}: BoardProps) {
  const [board, setBoard] = useState<string[]>([]);

  const [isLevelLoaded, setIsLevelLoaded] = useState(false);
  const [isLevelEnd, setIsLevelEnd] = useState(false);
  const [isGame, setIsGame] = useState(false);

  const [tapsCount, setTapsCount] = useState<number>(tiles);
  const [tapsSuccess, setTapsSuccess] = useState<number>(0);
  const [tapsDone, setTapsDone] = useState<number>(0);
  const [lastTileIndex, setLastTileIndex] = useState<number>(0);

  const boardSize = boardSizes.get(tiles);
  const boardWidth = boardSize?.w !== undefined ? boardSize.w : 3;
  const boardHeight = boardSize?.h !== undefined ? boardSize.h : 3;

  useEffect(() => {
    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      setIsLevelLoaded(() => true);
      // console.log('Board BG loaded');
      clearTimeout(timer);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [trial]);

  useEffect(() => {
    if (isLevelLoaded) {
      console.log('Load Default Board');
      setBoard(generateBoard(tiles));

      const timerStartGame: ReturnType<typeof setTimeout> = setTimeout(() => {
        setIsGame(() => true);
        setTapsCount(tiles);
        setTapsSuccess(0);
        setTapsDone(0);
        setLastTileIndex(0);
        console.log('Start Game');
        clearTimeout(timerStartGame);
      }, 4500);
      return () => {
        clearTimeout(timerStartGame);
      };
    }
  }, [isLevelLoaded]);

  useEffect(() => {
    if (isLevelLoaded && isLevelEnd) {
      setIsLevelLoaded(false);
      // setIsLevelEnd(false);
      console.log('Unload Level');
      setBoard(prev =>
        prev.map(el => {
          // console.log('el =====', el);
          if (el.includes('tile_guess') && !el.includes('flipped_guess')) {
            return el + ' flipped_end';
          } else {
            return el;
          }
        })
      );

      const timerNextLevel: ReturnType<typeof setTimeout> = setTimeout(() => {
        setIsLevelEnd(false);
        setBoard(() => []);
        setTiles(prev => {
          if (tapsSuccess === tapsCount) {
            return prev >= 30 ? prev : prev + 1;
          }
          if (tapsSuccess === tapsCount - 1) return prev;
          if (tapsSuccess < tapsCount - 1) {
            return prev === 1 ? prev : prev - 1;
          }
          return prev;
        });
        console.log('Next Level');
        setTrial(prev => prev + 1);
        clearTimeout(timerNextLevel);
      }, 3000);
    }
  }, [isLevelEnd]);

  useEffect(() => {
    console.log(tapsCount, tapsSuccess, tapsDone);
    if (tapsCount === tapsSuccess) {
      setBoard(prev =>
        prev.map((el, i) => {
          if (i === lastTileIndex && el.includes('tile_guess')) {
            return 'tile tile_allright';
          }
          return el;
        })
      );
    }
    if (tapsCount === tapsDone) {
      setIsGame(() => false);
      setIsLevelEnd(true);
      console.log('all tapes done!!!!', lastTileIndex);
    }
  }, [tapsDone, tapsSuccess]);

  return (
    <div
      className="board"
      style={{
        width: `${boardWidth * BOARD_ZOOM}px`,
        height: `${boardHeight * BOARD_ZOOM}px`,
      }}
    >
      {board.map((tileClassName, i) => (
        <div
          key={i}
          className={cn({
            ['tile-outer']: isLevelLoaded,
            ['tile-outer_hide']: isLevelEnd && tapsSuccess <= tapsCount,
            ['tile-outer_hide-win']: isLevelEnd && tapsSuccess === tapsCount,
          })}
        >
          <Tile
            className={tileClassName}
            index={i}
            isGame={isGame}
            setBoard={setBoard}
            tapsCount={tapsCount}
            setTapsCount={setTapsCount}
            tapsSuccess={tapsSuccess}
            setTapsSuccess={setTapsSuccess}
            tapsDone={tapsDone}
            setTapsDone={setTapsDone}
            setLastTileIndex={setLastTileIndex}
          />
        </div>
      ))}
    </div>
  );
}
