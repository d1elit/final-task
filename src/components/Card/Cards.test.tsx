import { render, screen, fireEvent } from '@testing-library/react';
import Card from './Card';
import '@testing-library/jest-dom';

describe('Card component', () => {
  it('Render an image with received correct src', () => {
    const shapeImg = 'https://example.com/image.jpg';
    render(<Card shapeImg={shapeImg} />);
    const image = screen.getByAltText('');
    expect(image).toHaveAttribute('src', shapeImg);
  });
});
