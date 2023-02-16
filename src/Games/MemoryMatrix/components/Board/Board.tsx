import React from 'react';
import Tile from '../Tile/Tile';
import './Board.scss';

interface BoardProps {
  w?: string;
  h?: string;
  tiles: number;
  boardSizes: Map<number, { w: number; h: number }>;
  children?: JSX.Element;
}

// const boardSizes: Map<number, { w: number; h: number }> = new Map([
//   [1, { w: 2, h: 2 }],
//   [2, { w: 2, h: 2 }],
//   [3, { w: 3, h: 3 }], 130 130
//   [4, { w: 4, h: 3 }], 180 130
//   [5, { w: 4, h: 4 }], 180 180
//   [6, { w: 5, h: 4 }],
//   [7, { w: 5, h: 5 }],
// ]);

export default function Board({ tiles = 1, boardSizes, children }: BoardProps) {
  const BOARD_ZOOM = 45;

  const boardSize = boardSizes.get(tiles);
  const boardWidth = boardSize?.w !== undefined ? boardSize.w : 3;
  const boardHeight = boardSize?.h !== undefined ? boardSize.h : 3;

  const board = new Array(boardWidth * boardHeight).fill(0);

  return (
    <div
      className="board"
      style={{
        width: `${boardWidth * BOARD_ZOOM}px`,
        height: `${boardHeight * BOARD_ZOOM}px`,
      }}
    >
      {board.map(el => (
        <Tile />
      ))}
    </div>
  );
}
