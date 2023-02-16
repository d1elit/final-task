import React from 'react';
import './StartGameTimer.scss';

interface StartGameProps {
  timerValue: number;
}

export default function StartGameTimer({ timerValue }: StartGameProps) {
  return <div className="start-game-timer">{timerValue}</div>;
}
