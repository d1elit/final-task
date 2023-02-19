import { authHost } from '.';

import { GameScore } from '../types/score';

const saveResults = async <T extends GameScore>(game: string, score: T) => {
  const res = await authHost.post<T>(`/score/${game}`, {
    score,
  });
  return res.data;
};

const getUserBestResults = async (game: string): Promise<GameScore[]> => {
  const res = await authHost.get<GameScore[]>(`/score/best/${game}`);
  return res.data;
};

const getUserLastResult = async (game: string): Promise<GameScore> => {
  const res = await authHost.get<GameScore>(`/score/last/${game}`);
  return res.data;
};

export default {
  saveResults,
  getUserBestResults,
  getUserLastResult,
};
