import type { GameResult } from '../../shared/types/score';
import { formatDate } from '../../utils/helpers/date';
import { useTranslation } from 'react-i18next';
import './LastResult.scss';

interface Props {
  result: GameResult | undefined;
}

export default function LastResult({ result }: Props) {
  const keys = Object.keys(result as GameResult).filter(
    key => key !== 'user' && key !== '_id' && key !== 'lastBoard'
  );

  const { t } = useTranslation();
  return (
    <div className="lastResult">
      <h3>{t('statsPage.lastResults')}</h3>
      <ul>
        {result &&
          keys.map(key => (
            <li key={key}>
              {t(`results.${key}`)}:{' '}
              {key === 'date'
                ? formatDate(result[key as keyof GameResult] as string)
                : result[key as keyof GameResult]}
            </li>
          ))}
      </ul>
    </div>
  );
}
