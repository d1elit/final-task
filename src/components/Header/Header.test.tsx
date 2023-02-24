import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../store';
import { BrowserRouter } from 'react-router-dom';
import SpeedMatch from '../../Games/GameSpeedMatch/SpeedMatch';
import MemoryMatch from '../../Games/GameMemoryMatch/MemoryMatch';
import MemoryMatrix from '../../Games/GameMatrix/MemoryMatrix/MemoryMatrix';
import RotationMatrix from '../../Games/GameMatrix/RotationMatrix/RotationMatrix';

const components = [
  { name: 'Speed Match', component: SpeedMatch },
  { name: 'Memory Match', component: MemoryMatch },
  { name: 'Memory Matrix', component: MemoryMatrix },
  { name: 'Rotation Matrix', component: RotationMatrix },
];

test('Header page rendered', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </Provider>
  );
  const btnElement = screen.getByText(/ru/i);
  expect(btnElement).toBeInTheDocument();
});

describe('User click on game link button in components', () => {
  components.forEach(elem => {
    it(`Render ${elem.name}  after clicking the link`, () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </Provider>
      );
      render(
        <>
          <Provider store={store}>
            <elem.component />
          </Provider>
        </>
      );
      const linkToGame = screen.getByText(`${elem.name}`);
      fireEvent.click(linkToGame);
      expect(
        screen.getByText(`${elem.name.split(' ').join('')}.description`)
      ).toBeInTheDocument();
    });
  });
});
