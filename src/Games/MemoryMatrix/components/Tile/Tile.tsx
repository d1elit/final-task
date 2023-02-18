import { useState } from 'react';
import './Tile.scss';

interface TileProps {
  className?: string;
  index: number;
  isGame: boolean;
  setBoard: React.Dispatch<React.SetStateAction<string[]>>;

  tapsCount: number;
  setTapsCount: React.Dispatch<React.SetStateAction<number>>;
  tapsSuccess: number;
  setTapsSuccess: React.Dispatch<React.SetStateAction<number>>;
  tapsDone: number;
  setTapsDone: React.Dispatch<React.SetStateAction<number>>;
  setLastTileIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function Tile({
  className,
  index,
  isGame,
  setBoard,
  tapsCount,
  setTapsCount,
  tapsSuccess,
  setTapsSuccess,
  tapsDone,
  setTapsDone,
  setLastTileIndex,
}: TileProps): JSX.Element {
  const flipCard = (prevBoard: string[], index: number) => {
    return prevBoard.map((el, i) => {
      if (i === index) {
        setLastTileIndex(() => i);
        setTapsDone(prev => prev + 1);
        if (el.includes('tile_default')) {
          return 'tile tile_wrong';
        } else if (el.includes('tile_guess')) {
          setTapsSuccess(prev => prev + 1);
          if (tapsSuccess === tapsCount) {
            return 'tile tile_allright';
          } else {
            return 'tile_guess flipped_guess';
          }
        }
      }
      return el;
    });
  };

  return (
    <div
      className={`tile ${className ? className : ''}`}
      onClick={() => isGame && setBoard(prev => flipCard(prev, index))}
    ></div>
  );
}
