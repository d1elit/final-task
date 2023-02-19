import {
  ChangeEventHandler,
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import scoreApi from '../shared/api/score';
import withAuth from '../shared/hoc/withAuth';
import { useAppSelector } from '../shared/hooks/store';
import { GameScore } from '../shared/types/score';

type GameSelect = {
  value: string;
  title: string;
};

const selectOptions: GameSelect[] = [
  {
    value: 'speed-match',
    title: 'Speed Match',
  },
  {
    value: 'memory-match',
    title: 'Memory Match',
  },
  {
    value: 'memory-matrix',
    title: 'Memory Matrix',
  },
];

const Stats: FC = () => {
  const userId = useAppSelector(state => state.user.data?._id);
  const [game, setGame] = useState<string>('speed-match');
  const [bests, setBests] = useState<GameScore[]>();

  const handleSelectChange: ChangeEventHandler<HTMLSelectElement> = e => {
    setGame(e.target.value);
  };

  const getStats = useCallback(async () => {
    const bests = await scoreApi.getUserBestResults(game);
    setBests(bests);
  }, [game]);

  useEffect(() => {
    void getStats();
  }, [getStats, game]);

  return (
    <div className="pageWrapper">
      <div className="container">
        <select onChange={handleSelectChange}>
          {selectOptions.map(game => (
            <option key={game.value} value={game.value}>
              {game.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default withAuth(Stats);
