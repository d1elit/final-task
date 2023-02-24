import { render, screen } from '@testing-library/react';
import Results from './Results';
import '@testing-library/jest-dom';

test('Results rendered', () => {
  render(
    <Results score={5000} gameName={'Speed Match'} onRetryHandler={() => {}} />
  );
  const gameName = screen.getByText(/Speed Match/i);
  const score = screen.getByText(/5000/i);
  expect(gameName).toBeInTheDocument();
  expect(score).toBeInTheDocument();
});
