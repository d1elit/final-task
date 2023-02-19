import type { GameResult } from '../../shared/types/score';
import { formatDate } from '../../utils/helpers/date';

import './LastResult.scss';

interface Props {
  result: GameResult | undefined;
}

export default function LastResult({ result }: Props) {
  return (
    <div className="lastResult">
      <h3>Your last Result</h3>
      <ul>
        {result &&
          Object.keys(result).map(key =>
            key === 'user' || key === '_id' ? null : (
              <li key={key}>
                {key}:{' '}
                {key === 'date'
                  ? formatDate(result[key as keyof GameResult] as string)
                  : result[key as keyof GameResult]}
              </li>
            )
          )}
      </ul>
    </div>
  );
}
