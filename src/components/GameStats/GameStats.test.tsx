import { render, screen, fireEvent } from '@testing-library/react';
import GameStats from './GameStats';
import '@testing-library/jest-dom';

describe('Stats component', () => {
  it('Rendered with props', () => {
    const props = {
      tiles: 20,
      trial: 3,
      timer: '05',
      score: 100,
    };

    render(<GameStats {...props} />);

    const tiles = screen.getByText('stats.tiles');
    expect(tiles.nextSibling).toHaveTextContent('20');

    const trial = screen.getByText('stats.trial');
    expect(trial.nextSibling).toHaveTextContent('3');

    const timer = screen.getByText('stats.time');
    expect(timer.nextSibling).toHaveTextContent('05');

    const score = screen.getByText('stats.score');
    expect(score.nextSibling).toHaveTextContent('100');
  });
});
