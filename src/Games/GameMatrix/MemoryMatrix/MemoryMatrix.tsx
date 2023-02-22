import React from 'react';
import Matrix, { MatrixGame } from '../components/Matrix/Matrix';
import './MemoryMatrix.scss';

export default function MemoryMatrix() {
  return <Matrix matrixGame={MatrixGame.MemoryMatrix} />;
}
