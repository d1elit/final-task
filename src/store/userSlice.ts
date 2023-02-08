import { createSlice } from "@reduxjs/toolkit";

type User = {
  _id: string;
  username: string;
};

type UserState = {
  isAuth: boolean;
  data: User | null;
};

const initialState: UserState = {
  isAuth: false,
  data: null,
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

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
