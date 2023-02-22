import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import Tile from '../Tile/Tile';
import './Board.scss';

import flipGoodPath from '../../../../assets/sounds/matrixSounds/flipGood.mp3';
import flipBadPath from '../../../../assets/sounds/matrixSounds/flipBad.mp3';
import flipWinPath from '../../../../assets/sounds/matrixSounds/flipWin.mp3';
import flipWinAll from '../../../../assets/sounds/matrixSounds/flipWinAll.mp3';

interface BoardProps {
  tiles: number;
  setTiles: React.Dispatch<React.SetStateAction<number>>;
  trial: number;
  setTrial: React.Dispatch<React.SetStateAction<number>>;
  addScore: () => void;
  addBonusScore: () => void;
  gameMessage: (tapsDone: number, tapsSuccess: number) => void;
  tutorMessage: (levelState: string) => void;
  endTutorial: () => void;
  isTutorial: boolean;
  setIsGameEnd: React.Dispatch<React.SetStateAction<boolean>>;
  refreshBestBoard: () => void;
  children?: JSX.Element;
}

const BOARD_ZOOM = 42;
const TRIAL_MAX = 12;

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
  addScore,
  addBonusScore,
  gameMessage,
  tutorMessage,
  endTutorial,
  isTutorial,
  setIsGameEnd,
  refreshBestBoard,
}: BoardProps) {
  const [board, setBoard] = useState<string[]>([]);

  const [isLevelLoaded, setIsLevelLoaded] = useState(false);
  const [isLevelEnd, setIsLevelEnd] = useState(false);
  const [isGame, setIsGame] = useState(false);

  const [tapsCount, setTapsCount] = useState<number>(tiles);
  const [tapsSuccess, setTapsSuccess] = useState<number>(0);
  const [tapsDone, setTapsDone] = useState<number>(0);
  const [lastTileIndex, setLastTileIndex] = useState<number>(0);

  const flipGood = new Audio(flipGoodPath);
  const flipBad = new Audio(flipBadPath);
  const flipWin = new Audio(flipWinPath);

  const boardSize = boardSizes.get(tiles);
  const boardWidth = boardSize?.w !== undefined ? boardSize.w : 3;
  const boardHeight = boardSize?.h !== undefined ? boardSize.h : 3;

  function checkEndOfGame() {
    return trial >= TRIAL_MAX;
  }

  // Waiting BG loaded
  useEffect(() => {
    // void new Audio(moveBg).play();

    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      setIsLevelLoaded(() => true);
      // console.log('Board BG loaded');
      clearTimeout(timer);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [trial, isTutorial]);

  useEffect(() => {
    if (isLevelLoaded) {
      // Load Board
      setBoard(generateBoard(tiles));
      tutorMessage('loading');

      const timerCoupIn: ReturnType<typeof setTimeout> = setTimeout(() => {
        void flipGood.play();
        clearTimeout(timerCoupIn);
      }, 1200);

      const timerCoupOut: ReturnType<typeof setTimeout> = setTimeout(() => {
        void flipGood.play();
        clearTimeout(timerCoupOut);
      }, 4500);

      // Waiting coup tiles and Start Game
      const timerStartGame: ReturnType<typeof setTimeout> = setTimeout(() => {
        // START GAME
        setIsGame(() => true);
        setTapsCount(tiles);
        setTapsSuccess(0);
        setTapsDone(0);
        setLastTileIndex(0);
        tutorMessage('game');
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
      // console.log('Unload Level');
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
          // Tutorial rules =========================================
          if (isTutorial) {
            if (tapsSuccess === tapsCount) {
              if (tiles === 3) {
                endTutorial();
                setTrial(() => 2);
                return 3;
              }
            }
            if (tapsSuccess < tapsCount) {
              return prev;
            }
          }
          //  Tutorial rules end ======================================

          if (tapsSuccess === tapsCount) {
            return prev >= 30 ? prev : prev + 1;
          }
          if (tapsSuccess === tapsCount - 1) return prev;
          if (tapsSuccess < tapsCount - 1) {
            return prev === 1 ? prev : prev - 1;
          }
          return prev;
        });
        // console.log('Next Level');
        refreshBestBoard();
        // check End Of GAME
        if (checkEndOfGame()) {
          setIsGameEnd(true);
        } else {
          isTutorial ? setTrial(prev => prev - 1) : setTrial(prev => prev + 1);
        }

        // isTutorial ? setTrial(prev => prev - 1) : setTrial(prev => prev + 1);
        // setTrial(prev => prev + 1);
        clearTimeout(timerNextLevel);
      }, 3000);
    }
  }, [isLevelEnd]);

  useEffect(() => {
    // console.log(tapsCount, tapsSuccess, tapsDone);
    gameMessage(tapsDone, tapsSuccess);
    if (tapsCount === tapsSuccess) {
      // All taps Success
      addBonusScore();
      setBoard(prev =>
        prev.map((el, i) => {
          if (i === lastTileIndex && el.includes('tile_guess')) {
            void flipWin.play();
            const timerFlipAll: ReturnType<typeof setTimeout> = setTimeout(
              () => {
                void new Audio(flipWinAll).play();
                clearTimeout(timerFlipAll);
              },
              1300
            );
            return 'tile tile_allright';
          }
          return el;
        })
      );
    }
    if (tapsCount === tapsDone) {
      // All taps Done
      setIsGame(() => false);
      setIsLevelEnd(true);
    }
  }, [tapsDone, tapsSuccess]);

  const onTileClick = (index: number) => {
    isGame &&
      setBoard(prevBoard =>
        prevBoard.map((el, i) => {
          if (i === index) {
            setLastTileIndex(() => i);
            setTapsDone(prev => prev + 1);
            if (el.includes('tile_default')) {
              void flipBad.play();
              return 'tile tile_wrong';
            } else if (el.includes('tile_guess')) {
              addScore();
              setTapsSuccess(prev => prev + 1);
              if (tapsSuccess === tapsCount) {
                return 'tile tile_allright';
              } else {
                void flipGood.play();
                return 'tile_guess flipped_guess';
              }
            }
          }
          return el;
        })
      );
  };

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
          <Tile className={tileClassName} index={i} onClick={onTileClick} />
        </div>
      ))}
    </div>
  );
}
