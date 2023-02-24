export interface BasicGameResult {
  _id?: string;
  game?: string;
  date?: string;
  score: number;
}

export interface MatchGameResult extends BasicGameResult {
  correct: string;
  accuracy: string;
}

export interface MatrixGameResult extends BasicGameResult {
  lastBoard: number;
}

export type GameResult = MatchGameResult | MatrixGameResult;
