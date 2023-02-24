import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StartGame from './StartGame';
import '@testing-library/jest-dom';
import SpeedMatch from '../../Games/GameSpeedMatch/SpeedMatch';
import MemoryMatch from '../../Games/GameMemoryMatch/MemoryMatch';
// import MemoryMatrix from '../../Games/GameMatrix/MemoryMatrix/MemoryMatrix';
// import RotationMatrix from '../../Games/GameMatrix/RotationMatrix/RotationMatrix';

const components = [
  { name: 'SpeedMatch', component: SpeedMatch },
  { name: 'MemoryMatch', component: MemoryMatch },
  // { name: 'MemoryMatrix', component: MemoryMatrix },
  // { name: 'RotationMatrix', component: RotationMatrix },
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
    expect(screen.getByText(/Game Description/i)).toBeInTheDocument();
    expect(screen.getByText(/startGame.play/i)).toBeInTheDocument();
    expect(screen.getByText(/startGame.howToPlay/i)).toBeInTheDocument();
  });
});
describe('Play button in components', () => {
  components.forEach(elem => {
    it(`Render ${elem.name}  after clicking the Play button`, () => {
      render(<elem.component />);
      const playButton = screen.getByText('startGame.play');
      fireEvent.click(playButton);
      expect(screen.getByText(`${elem.name}.description`)).toBeInTheDocument();
    });
  });
});
