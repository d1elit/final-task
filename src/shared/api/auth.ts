import axios, { AxiosError, isAxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import type { User, UserData } from '../types/User';
import {
  AnyAsyncThunk,
  RejectedActionFromAsyncThunk,
} from '@reduxjs/toolkit/dist/matchers';
import { APIError } from '../types/api';

export const authHost = axios.create({
  withCredentials: true,
  baseURL: `${process.env.REACT_APP_API_URL as string}/auth`,
  validateStatus: (status: number) => status < 400,
});

const login = createAsyncThunk(
  'user/login',
  async (
    userData: UserData,
    { rejectWithValue }
  ): Promise<User | RejectedActionFromAsyncThunk<AnyAsyncThunk>> => {
    try {
      const res = await authHost.post<User>('/login', {
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
      const res = await authHost.post<User>('/register', {
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
      const res = await authHost.get<User>('/me');
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
      const res = await authHost.get('/logout');
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
