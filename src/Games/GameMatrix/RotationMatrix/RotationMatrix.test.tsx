import { render, screen, fireEvent } from '@testing-library/react';
import RotationMatrix from './RotationMatrix';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../../store';

test('RotationMatrix rendered', () => {
  render(
    <Provider store={store}>
      <RotationMatrix />
    </Provider>
  );
  const gameName = screen.getByText(/RotationMatrix.title/i);
  expect(gameName).toBeInTheDocument();
});
