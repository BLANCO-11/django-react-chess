// src/components/Chessboard.js
import React from 'react';
import Square from './Square';

const Chessboard = ({ board, onDrop }) => {
  const handleDrop = (sourceSquare, targetSquare) => {
    // onDrop({ sourceSquare, targetSquare });
    console.log("Dropp");
  };

  return (
    <div className="chessboard">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((piece, colIndex) => (
            <Square key={colIndex} piece={piece} onDrop={handleDrop} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Chessboard;
