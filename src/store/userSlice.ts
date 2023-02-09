import { createSlice } from "@reduxjs/toolkit";

type User = {
  _id: string;
  username: string;
};

type UserState = {
  isAuth: boolean;
  data: User | null;
  status: "init" | "loading" | "error" | "success";
};

const initialState: UserState = {
  isAuth: false,
  data: null,
  status: "init",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: { payload: User }) {
      state.isAuth = true;
      state.data = action.payload;
    },
    logout(state, action) {
      state.isAuth = false;
      state.data = null;
    },
  },
});

export const { reducer: userReducer, actions: userActions } = userSlice;
