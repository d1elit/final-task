import { authHost } from '.';

const saveResults = async <T = unknown>(game: string, score: T) => {
  const res = await authHost.post<T>(`/score/${game}`, {
    score,
  });
  return res.data;
};

export default {
  saveResults,
};
