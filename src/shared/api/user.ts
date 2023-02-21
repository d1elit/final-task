import { AxiosError, isAxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type {
  AnyAsyncThunk,
  RejectedActionFromAsyncThunk,
} from '@reduxjs/toolkit/dist/matchers';

import type { GameName } from '../types/games';
import type { APIError } from '../types/api';
import { authHost } from '.';

const updatePlayedGames = createAsyncThunk(
  'user/playedGames',
  async (
    game: GameName,
    { rejectWithValue }
  ): Promise<GameName[] | RejectedActionFromAsyncThunk<AnyAsyncThunk>> => {
    try {
      const res = await authHost.patch<GameName[]>('/user/playedGames', {
        game,
      });
      return res.data;
    } catch (e) {
      const err = e as AxiosError<APIError>;
      if (isAxiosError(err) && err.response) {
        return rejectWithValue(err.response?.data?.message);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

export default {
  updatePlayedGames,
};
