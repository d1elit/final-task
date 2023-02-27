import type { GameResult } from './score';

export interface APIError {
  message: string;
}

export interface ResultResponse {
  lastBoard(lastBoard: number): number;
  game: string;
  results: GameResult | GameResult[];
}
