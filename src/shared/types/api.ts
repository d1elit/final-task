import type { GameResult } from './score';

export interface APIError {
  message: string;
}

export interface ResultResponse {
  game: string;
  results: GameResult | GameResult[];
}
