import { render, screen, fireEvent } from '@testing-library/react';
import StartGameTimer from './StartGameTimer';
import '@testing-library/jest-dom';

describe('StartGameTimer component', () => {
  it('StartGameTimer rendered with recivied timerValue', () => {
    render(<StartGameTimer timerValue={1} />);
    expect(screen.getByText(/1/)).toBeInTheDocument();
  });
});
