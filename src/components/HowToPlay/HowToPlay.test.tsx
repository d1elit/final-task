import { render, screen, fireEvent } from '@testing-library/react';
import HowToPlay from './HowToPlay';
import '@testing-library/jest-dom';

test('How To Play rendered', () => {
  render(<HowToPlay gameRules="Rules" onPlayHandler={() => {}} />);
  const btnElement = screen.getByText(/howToPlay.titl/i);
  expect(btnElement).toBeInTheDocument();
});

test('Calls onPlayHandler in how to play when Play button is clicked', () => {
  const onPlayHandler = jest.fn();
  const { getByText } = render(
    <HowToPlay gameRules="Rules" onPlayHandler={onPlayHandler} />
  );
  const playButton = getByText('Start Game');
  fireEvent.click(playButton);
  expect(onPlayHandler).toHaveBeenCalled();
});
