import axios, { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import type { User, UserData } from "../types/User";

export const authHost = axios.create({
  withCredentials: true,
  baseURL: `${process.env.REACT_APP_API_URL}/auth`,
});

const login = createAsyncThunk(
  "user/login",
  async (userData: UserData, { rejectWithValue }) => {
    try {
      const res = await authHost.post<User>("/login", {
        username: userData.username,
        password: userData.password,
      });
      return res;
    } catch (e) {
      const err = e as Error | AxiosError;
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data.message);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

const googleLogin = createAsyncThunk("user/googleLogin", async () => {
  window.open(`${authHost.defaults.baseURL}/google`, "_self");
});

const register = createAsyncThunk(
  "user/register",
  async (userData: UserData, { rejectWithValue }) => {
    try {
      const res = await authHost.post<User>("/register", {
        username: userData.username,
        password: userData.password,
      });
      return res;
    } catch (e) {
      const err = e as Error | AxiosError;
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data.message);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

const getMe = createAsyncThunk(
  "user/getMe",
  async (_: never, { rejectWithValue }) => {
    try {
      const res = await authHost.get<User>("/me");
      return res;
    } catch (e) {
      const err = e as Error | AxiosError;
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data.message);
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
};
