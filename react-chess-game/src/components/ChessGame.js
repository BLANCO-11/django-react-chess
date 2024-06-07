import React, {useState, useEffect, useRef} from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ChessGame = () => {
  const [fen, setFen] = useState('start');
  const [game, setGame] = useState(new Chess());
  const [currentTurn, setCurrentTurn] = useState('white');
  const [isGameOver, setIsGameOver] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { player, color } = location.state || {};
  const [gameId, setGameId] = useState(null);

  const makeAIMove = (chessInstance) => {
    const possibleMoves = chessInstance.moves();
    if (possibleMoves.length === 0) return;

    const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    chessInstance.move(randomMove);
    setFen(chessInstance.fen());
    setGame(chessInstance);
    setCurrentTurn(chessInstance.turn() === 'w' ? 'WHITE' : 'BLACK');
  };

  const handleMove = (fromSquare, toSquare) => {
    const newGame = new Chess(game.fen());
    let move;

    try {
      move = newGame.move({
        from: fromSquare,
        to: toSquare,
        promotion: 'q', // auto-promote to queen
      });

      if (move === null) {
        throw new Error('Invalid move');
      }

      setGame(newGame);
      setFen(newGame.fen());
      setCurrentTurn(newGame.turn() === 'w' ? 'WHITE' : 'BLACK');

      if (newGame.isCheckmate()) {
        toast.success(`${currentTurn === 'WHITE' ? 'BLACK' : 'WHITE'} wins by checkmate!`);
        setIsGameOver(true);
        setOpenDialog(true);
      } else if (newGame.isStalemate() && !isGameOver){
        toast.info('The game is a stalemate');
        updateGameDetails(gameId, "DRAW")
        setIsGameOver(true);
        setOpenDialog(true);
      } else if (newGame.isDraw()) {
        toast.info('The game is a draw');
        updateGameDetails(gameId, "DRAW")
        setIsGameOver(true);
        setOpenDialog(true);
      } else if (newGame.isCheck()) {
        const inCheckColor = newGame.turn() === 'w' ? 'WHITE' : 'BLACK';
        toast.warning(`${inCheckColor} is in check`);
      } else if (newGame.moves().length === 0) {
        // If there are no legal moves left for the current player
        const otherColor = newGame.turn() === 'w' ? 'BLACK' : 'WHITE';
        const hasLegalMoves = newGame.board().some(row =>
          row.some(piece => piece && piece.color === newGame.turn() && newGame.moves({ square: piece.square }).length > 0)
        );

        if (!hasLegalMoves) {
          toast.success(`${otherColor} wins by checkmate!`);
          if (otherColor.toLowerCase() == color){
            updateGameDetails(gameId, "WIN")
          }else{
            updateGameDetails(gameId, "LOSS")
          }
        } else {
          toast.info('The game is a draw');
          updateGameDetails(gameId, "DRAW")
        }
        setIsGameOver(true);
        setOpenDialog(true);
      }

      // AI move
      if (!isGameOver && newGame.turn() !== color[0]) {
        setTimeout(() => makeAIMove(newGame), 2000); // 2 seconds delay for AI move
      }

    } catch (error) {
      toast.error('Invalid move: ' + error.message);
      return false;
    }

    return true;
  };

  const updateGameDetails = async (gameId, gameResult) => {
    try {
        const response = await axios.put(`http://localhost:8000/api/update_game_history/${gameId}/`, { result: gameResult });        
        console.log('Game details updated successfully');
    } catch (error) {
        console.error('Error updating game details:', error);
    }
};


  const isInitialRender = useRef(true);

  useEffect(() => {
      if (isInitialRender.current) {
          isInitialRender.current = false;
          const createGameHistory = async () => {
              try {
                const response = await axios.post('http://localhost:8000/api/create_game_history/', {
                    player_name: player,
                    color: color,
                });
                console.log(response.data); // Log the response message
              } catch (error) {
                  console.error('Error creating game history:', error);
              }
          };

          createGameHistory();
      }

      if (color === 'black' && game.turn() === 'b') {
          setTimeout(() => makeAIMove(game), 2000); // 2 seconds delay for initial AI move
      }
  }, [color, game]);

  const handleRestart = () => {
    setOpenDialog(false);
    setIsGameOver(false);
    setFen('start');
    setGame(new Chess());
    setCurrentTurn('white');
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate('/');
  };

  return (
    <div>
      <div style={{
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: '#333',
        padding: '0.5rem',
        border: '2px solid #ccc',
        borderRadius: '5px',
        margin: '1rem auto',
        maxWidth: '200px',
        textAlign: 'center',
      }}>
        Current Turn: {currentTurn}
      </div>
      <Chessboard
        id="simple-board"
        position={fen}
        onPieceDrop={(sourceSquare, targetSquare) => !isGameOver && handleMove(sourceSquare, targetSquare)}
      />
      <ToastContainer position="bottom-center" autoClose={3000} />
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Game Over</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {currentTurn === 'WHITE' ? 'White' : 'Black'} wins!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRestart} color="primary">
            Restart Game
          </Button>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            Choose Players
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ChessGame;
