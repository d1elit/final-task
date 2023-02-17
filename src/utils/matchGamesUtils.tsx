import circle from '../assets/images/shapes/circle.png';
import rectangle from '../assets/images/shapes/rectangle.png';
import triangle from '../assets/images/shapes/triangle.png';
import rhombus from '../assets/images/shapes/rhombus.png';
import quatrefoil from '../assets/images/shapes/quatrefoil.png';
import { IShapes } from '../types/MatchGamesTypes';

export const shapes: IShapes[] = [
  { shapeName: 'rectangle', shapeImg: rectangle },
  { shapeName: 'circle', shapeImg: circle },
  { shapeName: 'triangle', shapeImg: triangle },
  { shapeName: 'rhombus', shapeImg: rhombus },
  { shapeName: 'quatrefoil', shapeImg: quatrefoil },
];

export const getNextCard = () => {
  return shapes[Math.floor(Math.random() * shapes.length)];
};
