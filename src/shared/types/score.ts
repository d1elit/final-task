export interface BasicGameScore {
  game?: string;
  score: number;
}

export interface SpeedMatchScore extends BasicGameScore {
  correct: string;
  accuracy: string;
}

export type GameScore = SpeedMatchScore;
