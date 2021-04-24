import React, { useEffect, useState } from 'react';
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

import { createStage, checkCollision } from '../gameHelpers';
//styled components
import {
  StyledTetris,
  StyledTetrisWrapper,
  OpponentViewWrapper,
} from '../styles/StyledTetris';

import { useParams } from 'react-router';
//custom hooks

import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useInterval } from '../hooks/useInterval';
import { useGameStatus } from '../hooks/useGameStatus';
import OpponentView from './OpponentView';

const Tetris = (socket) => {
  const { roomName, userName } = useParams();
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  // const socket = socket.socket;
  const [
    player,
    updatePlayerPos,
    resetPlayer,
    playerRotate,
    tetroArray,
    setTetroArray,
    isFinalTetro,
    initFinalTetroCheck,
  ] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );
  const [opponentStage, setOpponentStage] = useState(null);
  const [gamePlayers, setGamePlayers] = useState([]);
  const [owner, setOwner] = useState(false);

  useEffect(() => {
    console.log('I am ', userName);
    socket.socket.on('Game', async (data) => {
      console.log(data);
      data.forEach((player) => {
        if (player.playerName === userName && player.isOwner) setOwner(true);
      });
      setGamePlayers(data);
    });
  }, []);

  const movePlayer = (dir) => {
    if (isFinalTetro)
      return;
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
    emitData()
  };

  const setValues = async (tetroArrayServ) => {
    await initFinalTetroCheck();
    await setTetroArray(tetroArrayServ);
    await resetPlayer(null, tetroArrayServ);
    await setStage(createStage());
    await setDropTime(1000 / (level + 1) + 200);
    await setGameOver(false);
    await setScore(0);
    await setRows(0);
    await setLevel(0);
  };

  const startGame = async () => {
    console.log('starting!');
    //Reset everything
    await socket.socket.emit('getTetros');
    socket.socket.on('tetroArray', async (tetroArrayServ) => {
      setValues(tetroArrayServ);
    });
  };

  const drop = (player, stage) => {
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      //Gameover case
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const dropPlayer = () => {
    // emitData();
    setDropTime(null);
    drop(player, stage);
  };

  const keyUp = (e) => {
    if (!gameOver) {
      if (e.keyCode === 40) {
        setDropTime(1000 / (level + 1) + 200);
      }
    }
  };

  const move = (e) => {
    console.log(e.keyCode);
    if (!gameOver) {
      if (e.keyCode === 37) movePlayer(-1);
      else if (e.keyCode === 39) movePlayer(1);
      else if (e.keyCode === 40) dropPlayer();
      else if (e.keyCode === 38) playerRotate(stage, 1);
      emitData();
    }
  };

  useInterval(() => {
    emitData();
    drop(player, stage);
  }, dropTime);

  const emitData = () => {
    socket.socket.emit('stage', { stage, userName });
  };

  return (
    <StyledTetrisWrapper
      data-testid="tetris-wrapper"
      tabIndex={0}
      role="button"
      onKeyDown={(e) => move(e)}
      onKeyUp={(e) => keyUp(e)}
    >
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display gameOver={false} text={`Score: ${score}`} />
              <Display gameOver={false} text={`Rows: ${rows}`} />
              <Display gameOver={false} text={`Level: ${level}`} />
            </div>
          )}
          <StartButton
            text={owner ? 'Start Game' : 'Ready'}
            callback={() => startGame()}
          />
          <OpponentViewWrapper>
            {gamePlayers.map((player, index) => (
              <div
                style={{ width: player.playerName === userName ? '0%' : '50%' }}
                key={index}
              >
                {player.playerName === userName ? null : (
                  <div>
                    <OpponentView stage={player.stage ? player.stage : stage} userName={player.playerName} socket={socket} />
                  </div>
                )}
              </div>
            ))}
          </OpponentViewWrapper>
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
