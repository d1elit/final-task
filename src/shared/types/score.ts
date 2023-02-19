export interface BasicGameResult {
  game?: string;
  score: number;
}

export interface SpeedMatchResult extends BasicGameResult {
  correct: string;
  accuracy: string;
}

export type GameResult = SpeedMatchResult;
