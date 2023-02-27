import './GameAbout.scss';

interface Props {
  title: string;
  type: string;
  about: string;
}

export default function GameAbout({ title, type, about }: Props) {
  return (
    <div className="game-about">
      <h2 className="game-about__title">{title}</h2>
      <div className="game-about__type">{type}</div>
      <div className="game-about__about">{about}</div>
    </div>
  );
}
