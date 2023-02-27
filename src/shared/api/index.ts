import axios from 'axios';

export const authHost = axios.create({
  withCredentials: true,
  baseURL: `${process.env.REACT_APP_API_URL as string}`,
  validateStatus: (status: number) => status < 400,
});
