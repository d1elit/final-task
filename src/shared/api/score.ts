import { authHost } from '.';
import type { ResultResponse } from '../types/api';

import type { GameResult } from '../types/score';

const saveResults = async <T extends GameResult>(game: string, score: T) => {
  const res = await authHost.post<T>(`/score/${game}`, {
    score,
  });
  return res.data;
};

const getUserBestResults = async (game: string): Promise<ResultResponse> => {
  const res = await authHost.get<ResultResponse>(`/score/best/${game}`);
  return res.data;
};

const getUserLastResult = async (game: string): Promise<ResultResponse> => {
  const res = await authHost.get<ResultResponse>(`/score/last/${game}`);
  return res.data;
};
export default {
  saveResults,
  getUserBestResults,
  getUserLastResult,
};
