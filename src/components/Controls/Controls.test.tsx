import { render, screen } from '@testing-library/react';
import Controls from './Controls';
import '@testing-library/jest-dom';

test('Controls rendered', () => {
  render(<Controls />);
  const control = screen.getByText('controls.no');
  expect(control).toBeInTheDocument();
});
