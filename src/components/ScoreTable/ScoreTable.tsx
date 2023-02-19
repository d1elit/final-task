import { GameResult } from '../../shared/types/score';

import './ScoreTable.scss';

interface Props {
  results: GameResult[];
}

export default function ScoreTable({ results }: Props) {
  return results.length > 0 ? (
    <table className="table">
      <thead className="thead">
        <tr className="tr">
          <th className="th th_empty">number</th>
          {results.length > 0 &&
            Object.keys(results?.[0]).map(key =>
              key === 'user' || key === '_id' || key === 'game' ? null : (
                <th className="th" key={key}>
                  {key}
                </th>
              )
            )}
        </tr>
      </thead>
      <tbody>
        {results.map((res: GameResult, index) => (
          <tr className="tr" key={JSON.stringify(res)}>
            <td className="td">{index + 1}</td>
            {Object.keys(res).map((key: string) =>
              key === 'user' || key === '_id' || key === 'game' ? null : (
                <td className="td" key={res[key as keyof GameResult]}>
                  {key === 'date'
                    ? new Date(
                        res[key as keyof GameResult] as string
                      )?.toLocaleString()
                    : res[key as keyof GameResult]}
                </td>
              )
            )}
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <div className="no-results">No results</div>
  );
}
