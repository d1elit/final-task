interface GameScore {
  game?: string;
  score: number;
}

export interface SpeedMatchScore extends GameScore {
  correct: string;
  accuracy: string;
}
