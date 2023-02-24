import { render, screen } from '@testing-library/react';
import Stats from './Stats';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../store';

test('Start page rendered', () => {
  render(
    <Provider store={store}>
      <Stats />
    </Provider>
  );
  const btnElement = screen.getByText(/statsPage/i);
  expect(btnElement).toBeInTheDocument();
});
