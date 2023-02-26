import { render, screen, fireEvent } from '@testing-library/react';
import LastResult from './LastResult';
import '@testing-library/jest-dom';

describe('LastResults components', () => {
  it('LastResults rendered with recivied props', () => {
    render(
      <LastResult
        result={{ score: 1000, correct: '20/20', accuracy: '100%' }}
      />
    );
    expect(screen.getByText(/1000/)).toBeInTheDocument();
    expect(screen.getByText(/20\/20/)).toBeInTheDocument();
    expect(screen.getByText(/100%/)).toBeInTheDocument();
  });
});
