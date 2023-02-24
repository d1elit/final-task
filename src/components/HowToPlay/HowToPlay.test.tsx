import { render, screen } from '@testing-library/react';
import HowToPlay from './HowToPlay';
import '@testing-library/jest-dom';

test('Start game btn rendered in How To Play', () => {
  render(<HowToPlay gameRules="Rules" onPlayHandler={() => {}} />);
  const btnElement = screen.getByText(/Start Game/i);
  expect(btnElement).toBeInTheDocument();
});
