// src/components/Piece.js
import React from 'react';

const Piece = ({ type, color }) => {
  return type && color ? (
    <div className={`piece ${color}-${type}`}>
      {color} {type}
    </div>
  ) : null;
};

export default Piece;
