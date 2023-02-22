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

export const onMemoryMatchAnim = () => {
  const prevCard = document.querySelector('.cards-memory__prev') as HTMLElement;
  const prevPrevCard = document.querySelector(
    '.cards-memory__prevPrev'
  ) as HTMLElement;
  prevCard.classList.remove('animate-prev');
  prevPrevCard.classList.remove('animate-prev');
  prevCard.removeEventListener('click', onMemoryMatchAnim);
};

export const animateMemoryMatch = () => {
  const prevCopy = document.querySelector('.animate');
  const prevCard = document.querySelector('.cards-memory__prev') as HTMLElement;
  const prevPrevCard = document.querySelector(
    '.cards-memory__prevPrev'
  ) as HTMLElement;
  prevPrevCard.classList.add('animate-prev');
  prevCard.classList.add('animate-prev');
  prevCard.addEventListener('animationend', onMemoryMatchAnim);
  if (prevCopy && prevCopy !== null && prevCopy.parentNode) {
    prevCopy.parentNode.removeChild(prevCopy);
  }
  const currentCard = document.querySelector(
    '.cards-memory__field-current .card'
  ) as HTMLElement;
  const currentCardCopy = currentCard.cloneNode(true) as HTMLElement;
  const cardField = currentCard?.closest('.cards-memory__card-field');
  currentCardCopy.classList.add('animate');
  cardField?.append(currentCardCopy);
};

const onSpeedMatchAnim = () => {
  const prevCard = document.querySelector('.card:first-child') as HTMLElement;
  prevCard.classList.remove('animate-prev');
  prevCard.removeEventListener('click', onSpeedMatchAnim);
};

export const animateSpeedMatch = () => {
  const prevCopy = document.querySelector('.animate-speedMatch ');
  const prevCard = document.querySelector('.card:first-child') as HTMLElement;
  prevCard?.classList.add('animate-prev');
  prevCard.addEventListener('animationend', onSpeedMatchAnim);
  if (prevCopy && prevCopy !== null && prevCopy.parentNode) {
    prevCopy.parentNode.removeChild(prevCopy);
  }
  const currentCard = document.querySelector(
    '.cards__field-current .card'
  ) as HTMLElement;
  const currentCardCopy = currentCard.cloneNode(true) as HTMLElement;
  const cardField = currentCard?.closest('.cards__card-field');
  currentCardCopy.classList.add('animate-speedMatch');
  cardField?.append(currentCardCopy);
};
