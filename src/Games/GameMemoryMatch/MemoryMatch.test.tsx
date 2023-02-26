import { render, screen, fireEvent } from '@testing-library/react';
import MemoryMatch from './MemoryMatch';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../store';

test('MemoryMatch rendered', () => {
  render(
    <Provider store={store}>
      <MemoryMatch />
    </Provider>
  );
  const gameName = screen.getByText(/MemoryMatch.gameName/i);
  expect(gameName).toBeInTheDocument();
});
