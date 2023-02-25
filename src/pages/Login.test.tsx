import { render, screen } from '@testing-library/react';
import Login from './Login';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../store';

test('Login page rendered', () => {
  render(
    <Provider store={store}>
      <Login />
    </Provider>
  );
  const btnElement = screen.getByText(/loginPage.signIn/i);
  expect(btnElement).toBeInTheDocument();
});
