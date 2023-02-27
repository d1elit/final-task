import {
  ChangeEventHandler,
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import LastResult from '../components/LastResult/LastResult';
import Loader from '../components/Loader/Loader';
import ScoreTable from '../components/ScoreTable/ScoreTable';
import scoreApi from '../shared/api/score';
import withAuth from '../shared/hoc/withAuth';
import { GameName, Games } from '../shared/types/games';
import type { GameResult } from '../shared/types/score';

const selectOptions = [
  'Speed Match',
  'Memory Match',
  'Memory Matrix',
  'Rotation Matrix',
];

const Stats: FC = () => {
  const { t } = useTranslation();

  const [game, setGame] = useState<GameName>('speed-match');
  const [bests, setBests] = useState<GameResult[]>([]);
  const [lastResult, setLastResult] = useState<GameResult>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSelectChange: ChangeEventHandler<HTMLSelectElement> = e => {
    setGame(e.target.value as GameName);
  };

  const getStats = useCallback(async () => {
    setLoading(true);
    const bests = await scoreApi.getUserBestResults(game);
    const lastResult = await scoreApi.getUserLastResult(game);
    setBests(bests.results as GameResult[]);
    setLastResult(lastResult.results as GameResult);
    setLoading(false);
  }, [game]);

  useEffect(() => {
    void getStats();
  }, [getStats, game]);

  return (
    <div className="pageWrapper">
      <div className="container-xs">
        {t('results.chooseGame')}:{' '}
        <select onChange={handleSelectChange}>
          {selectOptions.map(game => (
            <option key={game} value={Games[game as keyof typeof Games]}>
              {game}
            </option>
          ))}
        </select>
        {loading ? (
          <Loader />
        ) : lastResult ? (
          <>
            <LastResult result={lastResult} />
            <ScoreTable title={`${t('results.bests')}`} results={bests} />
          </>
        ) : (
          <h3>{t('results.noRes')}</h3>
        )}
      </div>
    </div>
  );
};

export default withAuth(Stats);
