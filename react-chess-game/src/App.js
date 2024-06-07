// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PlayerForm from './components/PlayerForm';
import ChessGame from './components/ChessGame';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlayerForm />} />
        <Route path="/chessgame" element={<ChessGame />} />
      </Routes>
    </Router>
  );
};

export default App;
