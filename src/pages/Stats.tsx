import {
  ChangeEventHandler,
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import ScoreTable from '../components/ScoreTable/ScoreTable';
import scoreApi from '../shared/api/score';
import withAuth from '../shared/hoc/withAuth';
import { Games } from '../shared/types/games';
import type { GameResult } from '../shared/types/score';

const selectOptions = ['Speed Match', 'Memory Match', 'Memory Matrix'];

const Stats: FC = () => {
  const [game, setGame] = useState<string>('speed-match');
  const [bests, setBests] = useState<GameResult[]>([]);

  const handleSelectChange: ChangeEventHandler<HTMLSelectElement> = e => {
    setGame(e.target.value);
  };

  const getStats = useCallback(async () => {
    const bests = await scoreApi.getUserBestResults(game);
    setBests(bests.results as GameResult[]);
  }, [game]);

  useEffect(() => {
    void getStats();
  }, [getStats, game]);

  return (
    <div className="pageWrapper">
      <div className="container">
        <select onChange={handleSelectChange}>
          {selectOptions.map(game => (
            <option key={game} value={Games[game as keyof typeof Games]}>
              {game}
            </option>
          ))}
        </select>
        <ScoreTable results={bests} />
      </div>
    </div>
  );
};

export default withAuth(Stats);
