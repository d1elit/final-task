import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import Tile from '../Tile/Tile';
import './Board.scss';

import flipGoodPath from '../../../../assets/sounds/matrixSounds/flipGood.mp3';
import flipBadPath from '../../../../assets/sounds/matrixSounds/flipBad.mp3';
import flipWinPath from '../../../../assets/sounds/matrixSounds/flipWin.mp3';
import flipWinAllPath from '../../../../assets/sounds/matrixSounds/flipWinAll.mp3';

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
  setLastBoard: React.Dispatch<React.SetStateAction<number>>;
  refreshBestBoard: () => void;
  isRotation: boolean;
  playSound: (soundPath: HTMLAudioElement) => void;
  children?: JSX.Element;
}

const BOARD_ZOOM = 40;
const TRIAL_MAX = 12;

const DELAY_LOAD_BG = 1000;
const DELAY_FLIP_IN = 1000;
const DELAY_FLIP_OUT = 3700;
const DELAY_GAME = 4200;
const DELAY_ROTATION = 1000;
const DELAY_NEXT_LEVEL = 3000;

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
  isRotation,
  setLastBoard,
  playSound,
}: BoardProps) {
  const [board, setBoard] = useState<string[]>([]);

  const [isLevelLoaded, setIsLevelLoaded] = useState(false);
  const [isLevelEnd, setIsLevelEnd] = useState(false);
  const [isGame, setIsGame] = useState(false);

  const [tapsCount, setTapsCount] = useState<number>(tiles);
  const [tapsSuccess, setTapsSuccess] = useState<number>(0);
  const [tapsDone, setTapsDone] = useState<number>(0);
  const [lastTileIndex, setLastTileIndex] = useState<number>(0);
  const [boardRotation, setBoardRotation] = useState('board_init');
  const [tileRotation, setTileRotation] = useState('tile_init');

  const flipGood = new Audio(flipGoodPath);
  const flipBad = new Audio(flipBadPath);
  const flipWin = new Audio(flipWinPath);
  const flipWinAll = new Audio(flipWinAllPath);

  const boardSize = boardSizes.get(tiles);
  const boardWidth = boardSize?.w !== undefined ? boardSize.w : 3;
  const boardHeight = boardSize?.h !== undefined ? boardSize.h : 3;

  const DELAY_START_GAME = isRotation
    ? DELAY_GAME + DELAY_ROTATION
    : DELAY_GAME;

  function checkEndOfGame() {
    return trial >= TRIAL_MAX;
  }

  function rotateBoard() {
    if (
      boardRotation === 'board_init' ||
      boardRotation === 'board_right_center' ||
      boardRotation === 'board_left_center'
    ) {
      const wayNumber = Math.floor(Math.random() * 2);
      if (wayNumber > 0) {
        setBoardRotation(() => 'board_left');
        setTileRotation(() => 'tile_left');
      } else {
        setBoardRotation(() => 'board_right');
        setTileRotation(() => 'tile_right');
      }
    } else if (boardRotation === 'board_right') {
      setBoardRotation(() => 'board_right_center');
      setTileRotation(() => 'tile__init');
    } else if (boardRotation === 'board_left') {
      setBoardRotation(() => 'board_left_center');
      setTileRotation(() => 'tile__init');
    }
  }

  useEffect(() => {
    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      setIsLevelLoaded(() => true);
      clearTimeout(timer);
    }, DELAY_LOAD_BG);
    return () => {
      clearTimeout(timer);
    };
  }, [trial, isTutorial]);

  useEffect(() => {
    if (isLevelLoaded) {
      setBoard(generateBoard(tiles));
      tutorMessage('loading');

      const timerFlipIn: ReturnType<typeof setTimeout> = setTimeout(() => {
        playSound(flipGood);
        clearTimeout(timerFlipIn);
      }, DELAY_FLIP_IN);

      const timerFlipOut: ReturnType<typeof setTimeout> = setTimeout(() => {
        playSound(flipGood);
        clearTimeout(timerFlipOut);
      }, DELAY_FLIP_OUT);

      const timerRotation: ReturnType<typeof setTimeout> = setTimeout(() => {
        if (isRotation) {
          rotateBoard();
        }
        clearTimeout(timerRotation);
      }, DELAY_GAME);

      const timerStartGame: ReturnType<typeof setTimeout> = setTimeout(() => {
        setIsGame(() => true);
        setTapsCount(tiles);
        setTapsSuccess(0);
        setTapsDone(0);
        setLastTileIndex(0);
        tutorMessage('game');
        clearTimeout(timerStartGame);
      }, DELAY_START_GAME - 300);
      return () => {
        clearTimeout(timerStartGame);
      };
    }
  }, [isLevelLoaded]);

  useEffect(() => {
    if (isLevelLoaded && isLevelEnd) {
      setIsLevelLoaded(false);
      setBoard(prev =>
        prev.map(el => {
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
          if (tapsSuccess === tapsCount) {
            return prev >= 30 ? prev : prev + 1;
          }
          if (tapsSuccess === tapsCount - 1) return prev;
          if (tapsSuccess < tapsCount - 1) {
            return prev === 1 ? prev : prev - 1;
          }
          return prev;
        });
        refreshBestBoard();
        if (checkEndOfGame()) {
          setLastBoard(() => tiles);
          setIsGameEnd(true);
        } else {
          isTutorial ? setTrial(prev => prev - 1) : setTrial(prev => prev + 1);
        }

        clearTimeout(timerNextLevel);
      }, DELAY_NEXT_LEVEL);
    }
  }, [isLevelEnd]);

  useEffect(() => {
    gameMessage(tapsDone, tapsSuccess);
    if (tapsCount === tapsSuccess) {
      addBonusScore();
      setBoard(prev =>
        prev.map((el, i) => {
          if (i === lastTileIndex && el.includes('tile_guess')) {
            playSound(flipWin);
            const timerFlipAll: ReturnType<typeof setTimeout> = setTimeout(
              () => {
                playSound(flipWinAll);
                clearTimeout(timerFlipAll);
              },
              1300
            );
            return `tile tile_allright ${tileRotation}`;
          }
          return el;
        })
      );
    }
    if (tapsCount === tapsDone) {
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
              playSound(flipBad);
              return 'tile tile_wrong';
            } else if (el.includes('tile_guess')) {
              addScore();
              setTapsSuccess(prev => prev + 1);
              if (tapsSuccess === tapsCount) {
                return `tile tile_allright ${tileRotation}`;
              } else {
                playSound(flipGood);
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
      id="board"
      className={`board ${boardRotation}`}
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
            className={`tile ${tileClassName}`}
            index={i}
            onClick={onTileClick}
          />
        </div>
      ))}
    </div>
  );
}
