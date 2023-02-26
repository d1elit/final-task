import { render, screen, fireEvent } from '@testing-library/react';
import StartGame from './StartGame';
import '@testing-library/jest-dom';
import SpeedMatch from '../../Games/GameSpeedMatch/SpeedMatch';
import MemoryMatch from '../../Games/GameMemoryMatch/MemoryMatch';
import MemoryMatrix from '../../Games/GameMatrix/MemoryMatrix/MemoryMatrix';
import RotationMatrix from '../../Games/GameMatrix/RotationMatrix/RotationMatrix';
import store from '../../store/index';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

const components = [
  { name: 'SpeedMatch', component: SpeedMatch },
  { name: 'MemoryMatch', component: MemoryMatch },
  { name: 'MemoryMatrix', component: MemoryMatrix },
  { name: 'RotationMatrix', component: RotationMatrix },
];

describe('StartGame component', () => {
  it('Start game page rendered', () => {
    render(
      <StartGame
        title="Game Name"
        description="Game Description"
        onHowToPlayHandler={() => {}}
        onPlayHandler={() => {}}
      />
    );
    expect(screen.getByText(/Game Name/i)).toBeInTheDocument();
  });
});

describe('Start game  button rendered in all games', () => {
  components.forEach(elem => {
    it(`Render Start game  button in ${elem.name}`, () => {
      render(
        <Provider store={store}>
          <elem.component />
        </Provider>
      );
      expect(screen.getByText(/startGame.play/i)).toBeInTheDocument();
    });
  });
});

describe('How to play button rendered in all games', () => {
  components.forEach(elem => {
    it(`Render How to play button in ${elem.name}`, () => {
      render(
        <Provider store={store}>
          <elem.component />
        </Provider>
      );
      expect(screen.getByText(/startGame.howToPlay/i)).toBeInTheDocument();
    });
  });
});
