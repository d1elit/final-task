import { createSlice } from '@reduxjs/toolkit';
import auth from '../../shared/api/auth';

import type { User } from '../../shared/types/User';

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

const setUser = (state: UserState, action: { payload: User | string }) => {
  state.status = 'success';
  state.isAuth = true;
  state.data = action.payload as User;
};

const setError = (state: UserState, action: { payload: unknown }) => {
  state.status = 'error';
  state.data = null;
  state.error = action.payload as string;
};

const setStatusToLoading = (state: UserState) => {
  state.status = 'loading';
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
      .addCase(auth.logout.fulfilled, (state: UserState) => {
        state.status = 'success';
        state.isAuth = false;
        state.data = null;
      })
      .addCase(auth.logout.rejected, setError),
});

export const { reducer: userReducer, actions: userActions } = userSlice;
