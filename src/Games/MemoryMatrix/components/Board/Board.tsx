import React, { useEffect, useState } from 'react';
import Tile from '../Tile/Tile';
import './Board.scss';

interface BoardProps {
  tiles: number;
  boardSizes: Map<number, { w: number; h: number }>;
  children?: JSX.Element;
}

// const loadBoard = (board: JSX.Element[]): JSX.Element[] => {
//   return board.map(el => <Tile />);
// };

export default function Board({ tiles = 1, boardSizes }: BoardProps) {
  const [prevTiles, setPrevTiles] = useState(3);
  const [isLoadedBg, setIsLoadedBg] = useState(false);
  const [isUnloadedTiles, setIsUnloadedTiles] = useState(false);

  const BOARD_ZOOM = 42;

  const boardSize = boardSizes.get(tiles);
  const boardWidth = boardSize?.w !== undefined ? boardSize.w : 3;
  const boardHeight = boardSize?.h !== undefined ? boardSize.h : 3;
  const boardTilesCount = boardWidth * boardHeight;

  // const board: JSX.Element[] = new Array<JSX.Element>(
  //   boardWidth * boardHeight
  // ).fill(<Tile />);

  // const board = Array.from({ length: boardTilesCount }, (_, i) => (
  //   <Tile key={i} className="tile_default" />
  // ));

  const board: JSX.Element[] = Array.from(
    { length: boardTilesCount },
    (_, i) => <Tile key={i} className="tile_default" />
  );

  // const [gameBoard, setGameBoard] = useState(board);

  // setGameBoard(board);
  console.log(board);
  // console.log(gameBoard);
  for (let i = 0; i < tiles; ) {
    const x = Math.floor(Math.random() * boardWidth);
    const y = Math.floor(Math.random() * boardHeight);
    const index = y * boardWidth + x;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (board[index].props.className === 'tile_guess') {
      continue;
    }

    board[index] = <Tile key={index} className="tile_guess" />;
    i += 1;
    console.log(x, y, index);
    console.log(board[index]);
  }
  console.log(board);
  // useEffect(() => {
  //   const myInterval = setInterval(() => {
  //     console.log('2. конец уничтожение тайлов');
  //     console.log('3. начало изменение доски');
  //     setIsUnloadedTiles(true);
  //     // console.log('destroy tiles in', isUnloadedTiles);
  //     setIsLoadedBg(false);
  //     // setIsUnloadedTiles(true);
  //     // console.log('setInterval', isLoadedBg, isUnloadedTiles);
  //     setPrevTiles(tiles);
  //     clearInterval(myInterval);
  //   }, 2000);
  //   return () => {
  //     clearInterval(myInterval);
  //     setIsUnloadedTiles(false);
  //     board.forEach(el => <Tile className="destroy" />);
  //     // console.log('clearInterval', isLoadedBg, isUnloadedTiles);
  //     console.log('1. старт уничтожение тайлов');
  //     // console.log('destroy tiles out', isUnloadedTiles);
  //     setGameBoard(board.map(el => <Tile className="destroy" />));
  //     // setIsLoadedBg(false);
  //   };
  // }, [tiles]);

  // useEffect(() => {
  //   const myInterval = setInterval(() => {
  //     console.log('3 конец изменения доски', isLoadedBg, isUnloadedTiles);
  //     console.log('4 начало создания тайлов', isLoadedBg, isUnloadedTiles);
  //     setIsLoadedBg(true);
  //     clearInterval(myInterval);
  //     // setIsUnloadedTiles(true);
  //   }, 2000);
  //   return () => {
  //     console.log('3.0', isLoadedBg, isUnloadedTiles);
  //     // setIsUnloadedTiles(true);
  //     // setIsLoadedBg(false);
  //     clearInterval(myInterval);
  //   };
  // }, [isUnloadedTiles]);

  const flipCard = (index: number) => {
    console.log(index);
  };

  return (
    <>
      <div
        className="board"
        style={{
          width: `${boardWidth * BOARD_ZOOM}px`,
          height: `${boardHeight * BOARD_ZOOM}px`,
        }}
      >
        {/* {children} */}
        {board.map((el, i) => el)}

        {/* {loadBoard(gameBoard)} */}
      </div>
    </>
  );

  // return (
  //   <>
  //     <div
  //       className="board"
  //       style={{
  //         width: `${boardWidth * BOARD_ZOOM}px`,
  //         height: `${boardHeight * BOARD_ZOOM}px`,
  //       }}
  //     >
  //       {/* {children} */}
  //       {board.map((el, i) => {
  //         let isFlipped = false;
  //         isFlipped = true;
  //         return (
  //           <div
  //             className={`tile__container ${isFlipped ? 'flipped' : ''}`}
  //             key={i}
  //             onClick={() => flipCard(i)}
  //           >
  //             {el}
  //           </div>
  //         );
  //       })}

  //       {/* {loadBoard(gameBoard)} */}
  //     </div>
  //   </>
  // );
}
