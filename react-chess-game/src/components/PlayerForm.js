import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import axios from 'axios';

const PlayerForm = () => {
  const [player, setPlayer] = useState('');
  const [color, setColor] = useState('white');
  const [recentGames, setRecentGames] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/chessgame', { state: { player, color } });
  };

  function getClassForGameResult(result) {
    switch (result.toUpperCase()) {
      case 'WIN':
        return 'win';
      case 'LOSS':
        return 'loss';
      case 'DRAW':
        return 'draw';
      default:
        return '';
    }
  }
  
  

  useEffect(() => {
    const fetchRecentGames = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/recent_games/');
        setRecentGames(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchRecentGames();
  }, []);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="form-title">Start New Game</h2>
        <div className="form-group">
          <label>Player Name:</label>
          <input
            type="text"
            value={player}
            onChange={(e) => setPlayer(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Color:</label>
          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="form-input"
          >
            <option value="white">White</option>
            <option value="black">Black</option>
          </select>
        </div>
        <button type="submit" className="form-button">Start Game</button>
      </form>
      
      <div className="game-history">
        <h2>Recent Games</h2>
        <ul>
          {recentGames.map((game) => (
            <li key={game.game_id} className={getClassForGameResult(game.result)}>
              <span>{game.player_username.toUpperCase()} - </span>
              <span>{game.color.toUpperCase()} - </span>
              <span>{game.result.toUpperCase()} - </span>
              <span>{game.game_date.toUpperCase()}</span>
            </li>
          ))}
        </ul>
      </div>



    </div>
  );

};

export default PlayerForm;
