import React, { useState } from 'react';
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

import { createStage, checkCollision } from '../gameHelpers';
//styled components
import { StyledTetris, StyledTetrisWrapper } from '../styles/StyledTetris';

//custom hooks
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useInterval } from '../hooks/useInterval';
import { useGameStatus } from '../hooks/useGameStatus';
import OpponentView from './OpponentView';

const Tetris = (socket) => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );
  const [opponentStage, setOpponentStage] = useState(null);

  const movePlayer = (dir) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const startGame = async () => {
    console.log('starting!');
    //Reset everything
    await socket.socket.emit('getTetros')
    await socket.socket.on('tetroArray', async (tetroArrayServ) => {
      // resetTetroArray(tetroarray);
      console.log("TETROOOOOOOOOOO", tetroArrayServ)
      await localStorage.setItem('TetroArr', JSON.stringify(tetroArrayServ))
      await localStorage.setItem('TetroArrPos', 0)
      await resetPlayer(null, tetroArrayServ);
      await setStage(createStage());
      await setDropTime(1000 / (level + 1) + 200);
      await setGameOver(false)
      await setScore(0);
      await setRows(0);
      await setLevel(0);
      // console.log("TETRO ARR", tetroArray);
    })
  };

  const drop = () => {
    //increase level when player has cleared 10 rows
    // if (rows > (level + 1) * 20) {
    //   setLevel((prev) => prev + 1);
    //   //Also increase speed
    //   setDropTime(1000 / (level + 1) + 200);
    // }
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
    emitData();
    setDropTime(null);
    drop();
  };

  const keyUp = (e) => {
    if (!gameOver) {
      if (e.keyCode === 40) {
        setDropTime(1000 / (level + 1) + 200);
      }
    }
  };

  const move = (e) => {
    if (!gameOver) {
      if (e.keyCode === 37) movePlayer(-1);
      else if (e.keyCode === 39) movePlayer(1);
      else if (e.keyCode === 40) dropPlayer();
      else if (e.keyCode === 38) playerRotate(stage, 1);
    }
  };

  useInterval(() => {
    emitData();
    drop();
  }, dropTime);

  // console.log("SOCKET", socket.socket);

  const emitData = () => {
    socket.socket.emit('stage', stage);
    socket.socket.on('OpponentStage', async (oppStage) => {
      setOpponentStage(oppStage);
    });
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
            <>
              <Display gameOver={gameOver} text="Game Over" />
            </>
          ) : (
            <div>
              <Display gameOver={false} text={`Score: ${score}`} />
              <Display gameOver={false} text={`Rows: ${rows}`} />
              <Display gameOver={false} text={`Level: ${level}`} />
            </div>
          )}
          <StartButton callback={() => startGame()} />
          {opponentStage !== null ? (
            <OpponentView stage={opponentStage} />
          ) : null}
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
