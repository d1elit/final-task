import { AxiosError, isAxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  AnyAsyncThunk,
  RejectedActionFromAsyncThunk,
} from '@reduxjs/toolkit/dist/matchers';

import { authHost } from '.';
import type { APIError } from '../types/api';
import type { User, UserData } from '../types/user';

const login = createAsyncThunk(
  'user/login',
  async (
    userData: UserData,
    { rejectWithValue }
  ): Promise<User | RejectedActionFromAsyncThunk<AnyAsyncThunk>> => {
    try {
      const res = await authHost.post<User>('/auth/login', {
        username: userData.username,
        password: userData.password,
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

const googleLogin = createAsyncThunk('user/googleLogin', () => {
  window.open(
    `${process.env.REACT_APP_API_URL as string}/auth/google`,
    '_self'
  );
});

const register = createAsyncThunk(
  'user/register',
  async (
    userData: UserData,
    { rejectWithValue }
  ): Promise<User | RejectedActionFromAsyncThunk<AnyAsyncThunk>> => {
    try {
      const res = await authHost.post<User>('/auth/register', {
        username: userData.username,
        password: userData.password,
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

const getMe = createAsyncThunk(
  'user/getMe',
  async (
    _: null,
    { rejectWithValue }
  ): Promise<User | RejectedActionFromAsyncThunk<AnyAsyncThunk>> => {
    try {
      const res = await authHost.get<User>('/auth/me');
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

const logout = createAsyncThunk(
  'user/logout',
  async (
    _: null,
    { rejectWithValue }
  ): Promise<User | RejectedActionFromAsyncThunk<AnyAsyncThunk>> => {
    try {
      const res = await authHost.get('/auth/logout');
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
  login,
  googleLogin,
  register,
  getMe,
  logout,
};
