import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import auth from '../../shared/api/auth';
import user from '../../shared/api/user';

import type { GameName } from '../../shared/types/games';
import type { User } from '../../shared/types/user';

type UserState = {
  isAuth: boolean;
  data: User | null;
  status: 'init' | 'loading' | 'error' | 'success';
  error: string | null;
};

const initialState: UserState = {
  isAuth: false,
  data: null,
  status: 'init',
  error: null,
};

const setUser = (state: UserState, action: PayloadAction<User>) => {
  state.status = 'success';
  state.error = null;
  state.isAuth = true;
  state.data = action.payload;
};

const setError = (state: UserState, action: PayloadAction<unknown>) => {
  state.status = 'error';
  state.data = null;
  state.error = action.payload as string;
};

const setStatusToLoading = (state: UserState) => {
  state.status = 'loading';
};

const setPlayedGames = (
  state: UserState,
  action: PayloadAction<GameName[]>
) => {
  if (state.data) {
    state.data.playedGames = action.payload;
  }
};

const logout = (state: UserState) => {
  state.status = 'success';
  state.isAuth = false;
  state.data = null;
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(auth.login.pending, setStatusToLoading)
      .addCase(auth.login.fulfilled, setUser)
      .addCase(auth.login.rejected, setError)
      .addCase(auth.register.pending, setStatusToLoading)
      .addCase(auth.register.fulfilled, setUser)
      .addCase(auth.register.rejected, setError)
      .addCase(auth.getMe.pending, setStatusToLoading)
      .addCase(auth.getMe.fulfilled, setUser)
      .addCase(auth.getMe.rejected, setError)
      .addCase(auth.logout.pending, setStatusToLoading)
      .addCase(auth.logout.fulfilled, logout)
      .addCase(auth.logout.rejected, setError)
      .addCase(user.updatePlayedGames.fulfilled, setPlayedGames)
      .addCase(user.updatePlayedGames.rejected, setError),
});

export const { reducer: userReducer, actions: userActions } = userSlice;
