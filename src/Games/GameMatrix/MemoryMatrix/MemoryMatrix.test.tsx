import { render, screen, fireEvent } from '@testing-library/react';
import MemoryMatrix from './MemoryMatrix';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../../store';

test('MemoryMatrix rendered', () => {
  render(
    <Provider store={store}>
      <MemoryMatrix />
    </Provider>
  );
  const gameName = screen.getByText(/MemoryMatrix.title/i);
  expect(gameName).toBeInTheDocument();
});
