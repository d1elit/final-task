import { render, screen, fireEvent } from '@testing-library/react';
import SpeedMatch from './SpeedMatch';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../store';

test('SpeedMatch rendered', () => {
  render(
    <Provider store={store}>
      <SpeedMatch />
    </Provider>
  );
  const gameName = screen.getByText(/SpeedMatch.gameName/i);
  expect(gameName).toBeInTheDocument();
});
