export interface BasicGameResult {
  _id?: string;
  game?: string;
  date?: string;
  score: number;
}

export interface SpeedMatchResult extends BasicGameResult {
  correct: string;
  accuracy: string;
}

export type GameResult = SpeedMatchResult;
