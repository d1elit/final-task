import { render, screen } from '@testing-library/react';
import AnswerIndicator from './AnswerIndicator';
import '@testing-library/jest-dom';

test('AnswerIndicator render success icon if isSuccess=true', () => {
  render(<AnswerIndicator isSuccess={true} />);
  const successIcon = screen.getByText('✔');
  expect(successIcon).toBeInTheDocument();
});

test('AnswerIndicator render failure icon if isSuccess=false', () => {
  render(<AnswerIndicator isSuccess={false} />);
  const failureIcon = screen.getByText('❌');
  expect(failureIcon).toBeInTheDocument();
});
