import React from 'react';
import Matrix, { MatrixGame } from '../components/Matrix/Matrix';
import './RotationMatrix.scss';

export default function RotationMatrix() {
  return <Matrix matrixGame={MatrixGame.RotationMatrix} />;
}
