import { render, screen, fireEvent } from '@testing-library/react';
import Cards from './Cards';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../../../store';

test('Cards rendered', () => {
  const { container } = render(
    <Provider store={store}>
      <Cards currentCard="" secondCard="" thirdCard="" />
    </Provider>
  );
  const cards = container.querySelector('.cards-memory');
  expect(cards).toBeInTheDocument();
});
