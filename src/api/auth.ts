import axios from "axios";

import type { User } from "../shared/types/User";

export const authHost = axios.create({
  withCredentials: true,
  baseURL: `${process.env.REACT_APP_API_URL}/auth`,
});

type UserData = {
  username: string;
  password: string;
};

async function login(userData: UserData) {
  const res = await authHost.post<User>("/login", {
    username: userData.username,
    password: userData.password,
  });
  return res;
}

async function googleLogin() {
  window.open(`${authHost.defaults.baseURL}/google`, "_self");
}

async function register(userData: UserData) {
  const res = await authHost.post<User>("/register", {
    username: userData.username,
    password: userData.password,
  });
  return res;
}

async function getMe(userId: string) {
  const user = await authHost.get<User>("/me");
}

export default {
  login,
  googleLogin,
  register,
  getMe,
};
