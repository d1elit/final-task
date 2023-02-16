import cn from 'classnames';
import React from 'react';
import './Tile.scss';

interface TileProps {
  className: string;
  children?: JSX.Element;
}

// export default function Tile({
//   style,
// }: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
//   return <div className="tile" style={style}></div>;
// }

const flipCard = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  const card: HTMLDivElement | null = e.target as HTMLDivElement;
  console.log(e.target);
  // console.log(card.classList.contains('tile_default'));

  if (card.classList.contains('tile_default')) {
    card.classList.add('tile_wrong', 'flipped');
    card.className = 'tile tile_wrong';
  } else if (card.classList.contains('tile_guess')) {
    card.classList.add('flipped_guess');
  }
};

export default function Tile({ className }: TileProps): JSX.Element {
  return (
    <div
      className={`tile ${className ? className : ''}`}
      onClick={e => flipCard(e)}
    ></div>
  );
}
