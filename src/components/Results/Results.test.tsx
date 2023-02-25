import { render, screen, fireEvent } from '@testing-library/react';
import Results from './Results';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../store';

test('Results rendered', () => {
  render(
    <Provider store={store}>
      <Results
        score={5000}
        gameName={'Speed Match'}
        onRetryHandler={() => {}}
      />
    </Provider>
  );
  const gameName = screen.getByText(/Speed Match/i);
  const score = screen.getByText(/5000/i);
  expect(gameName).toBeInTheDocument();
  expect(score).toBeInTheDocument();
});

test('Calls onRetryHandler when the Retry button is clicked', () => {
  const onRetryHandler = jest.fn();
  const { getByText } = render(
    <Results
      score={5000}
      gameName={'Speed Match'}
      onRetryHandler={onRetryHandler}
    />
  );
  const playButton = getByText('results.tryAgain');
  fireEvent.click(playButton);
  expect(onRetryHandler).toHaveBeenCalled();
});
