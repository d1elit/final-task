import './Tile.scss';

interface TileProps {
  className?: string;
  index: number;
  onClick: (index: number) => void;
}

export default function Tile({
  className,
  index,
  onClick,
}: TileProps): JSX.Element {
  return (
    <div
      className={`tile ${className ? className : ''}`}
      onClick={() => onClick(index)}
    ></div>
  );
}
