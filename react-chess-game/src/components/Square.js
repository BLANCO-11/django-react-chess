// src/components/Square.js
import React from 'react';
import Piece from './Piece';

const Square = ({ piece }) => {
  return (
    <div className="square">
      {piece && <Piece type={piece.type} color={piece.color} />}
    </div>
  );
};

export default Square;
