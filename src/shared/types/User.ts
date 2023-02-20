import type { GameName } from './games';

export type User = {
  _id: string;
  username: string;
  playedGames: GameName[];
};

export type UserData = {
  username: string;
  password: string;
};
