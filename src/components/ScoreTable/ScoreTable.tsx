import { useTranslation } from 'react-i18next';
import type { GameResult } from '../../shared/types/score';
import { formatDate } from '../../utils/helpers/date';

import './ScoreTable.scss';

interface Props {
  results: GameResult[];
  title?: string;
}

export default function ScoreTable({ results, title = '' }: Props) {
  const keys = Object.keys(results[0]).filter(
    key =>
      key !== 'lastBoard' && key !== 'game' && key !== 'user' && key !== '_id'
  );

  const { t } = useTranslation();

  return (
    <>
      {results.length > 0 && (
        <>
          <h3 className="scoreTable__title">{title}</h3>
          <table className="table">
            <thead className="thead">
              <tr className="tr">
                <th className="th th_empty">number</th>
                {results.length > 0 &&
                  keys.map(key => (
                    <th className="th" key={key}>
                      {t(`results.${key}`)}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {results.map((res: GameResult, index) => (
                <tr className="tr" key={JSON.stringify(res)}>
                  <td className="td">{index + 1}</td>
                  {keys.map((key: string) => (
                    <td className="td" key={res[key as keyof GameResult]}>
                      {key === 'date'
                        ? formatDate(res[key as keyof GameResult] as string)
                        : res[key as keyof GameResult]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
