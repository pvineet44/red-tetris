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
  const [ready, isReady] = useState(false);
  const [start, setStart] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [gameOverText, setGameOverText] = useState('Game Over');
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
  const [stage, setStage, rowsCleared, updateStage, addPenaltyRows] = useStage(
    player,
    resetPlayer,
    socket.socket
  );
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );
  const [opponentStage, setOpponentStage] = useState(null);
  const [gamePlayers, setGamePlayers] = useState([]);
  const [owner, setOwner] = useState(false);

  useEffect(() => {
    // console.log('I am ', userName);
    testfx();
    socket.socket.on('Game', async (data) => {
      console.log('Game: ', data);
      data.forEach((player) => {
        if (player.playerName === userName && player.isOwner) setOwner(true);
        else if (player.playerName === userName && !player.isOwner)
          setOwner(false);
      });
      setGamePlayers(data);
    });
    socket.socket.on('CanStart', (data) => {
      console.log('Can start now!', owner);
      setStart(true);
    });
    socket.socket.on('tetroArray', async (tetroArrayServ) => {
      isReady(false);
      console.log('recv tetro', tetroArrayServ);
      setValues(tetroArrayServ);
    });
    socket.socket.on('Over', (winner) => {
      console.log('OVER', winner);
      setGameOver(true);
      setDropTime(null);
      if (winner === userName) {
        setGameOverText('You win!');
      } else setGameOverText('Game Over!');
      setDisabled(false);
      setStart(false);
    });
  }, []);

  const movePlayer = (dir) => {
    if (isFinalTetro) return;
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
    emitData();
  };

  // console.log('start button: ', owner && gamePlayers.length !== 1 && !start);

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
    //Reset everything
    if (!start && gamePlayers.length !== 1) return;
    setDisabled(true);
    await socket.socket.emit('getTetros');
  };
  const startSinglePlayer = () => {
    return 'To start single player, just start and keep playing';
  };
  const startMultiPlayer = () => {
    return 'To start multiplayer, wait for all players to be ready and then begin';
  };

  const onReady = () => {
    isReady(true);
    setDisabled(true);
    socket.socket.emit('ready', userName);
  };

  const drop = (player, stage) => {
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      //Gameover case
      if (player.pos.y < 1) {
        socket.socket.emit('GameOver', { userName });
        setGameOver(true);
        setDropTime(null);
        if (gamePlayers.length === 1) setDisabled(false);
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

  const tetroBlockTypeI = () => {
    return 'Tetro type I';
  };
  const tetroBlockTypeJ = () => {
    return 'Tetro type J';
  };
  const tetroBlockTypeL = () => {
    return 'Tetro type L';
  };
  const tetroBlockTypeO = () => {
    return 'Tetro type O';
  };
  const tetroBlockTypeS = () => {
    return 'Tetro type S';
  };
  const tetroBlockTypeT = () => {
    return 'Tetro type T';
  };
  const tetroBlockTypeZ = () => {
    return 'Tetro type Z';
  };
  const tetroBlockTypeX = () => {
    return 'Tetro type X - solid straight line';
  };
  const tetroTypes = () => {
    return 'Tetro types are as follows';
  };

  const freeDropPlayer = async () => {
    if (player.pos.y < 1) return;
    // if (isFinalTetro){
    //   if(player.tetrimino.length === 0)
    //   {
    //     {
    //       //Gameover case
    //         socket.socket.emit('GameOver', { userName });
    //         setGameOver(true);
    //         setDropTime(null);
    //         if (gamePlayers.length === 1) setDisabled(false);
    //       updatePlayerPos({ x: 0, y: 0, collided: true });
    //     }
    //   }
    //   else {
    //     setGameOver(true)
    //     dropPlayer(true);
    //   }
    //   return
    // }
    var i = 0;
    for (i; i < 20; i++) {
      if (checkCollision(player, stage, { x: 0, y: i })) {
        break;
      }
    }
    await updatePlayerPos({ x: 0, y: i - 1, collided: true });
  };

  const move = (e) => {
    // console.log(e.keyCode);
    if (!gameOver) {
      if (e.keyCode === 37) movePlayer(-1);
      else if (e.keyCode === 39) movePlayer(1);
      else if (e.keyCode === 40) dropPlayer();
      else if (e.keyCode === 38) playerRotate(stage, 1);
      else if (e.keyCode === 32) freeDropPlayer();
      emitData();
    }
  };

  useInterval(() => {
    if (gameOver) return;
    emitData();
    drop(player, stage);
  }, dropTime);

  const emitData = () => {
    socket.socket.emit('stage', { stage, userName });
  };

  const testfx = () => {
    tetroTypes();
    tetroBlockTypeI();
    tetroBlockTypeJ();
    tetroBlockTypeL();
    tetroBlockTypeO();
    tetroBlockTypeS();
    tetroBlockTypeT();
    tetroBlockTypeZ();
    tetroBlockTypeX();
    startSinglePlayer();
    startMultiPlayer();
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
        <Stage stage={stage} ready={ready} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text={gameOverText} />
          ) : (
            <div>
              <Display gameOver={false} text={`Score: ${score}`} />
              <Display gameOver={false} text={`Rows: ${rows}`} />
              <Display gameOver={false} text={`Level: ${level}`} />
            </div>
          )}
          <StartButton
            text={owner ? 'Start Game' : 'Ready'}
            disabled={disabled}
            callback={owner ? () => startGame() : () => onReady()}
          />
          <OpponentViewWrapper>
            {gamePlayers.map((player, index) => (
              <div
                style={{ width: player.playerName === userName ? '0%' : '50%' }}
                key={index}
              >
                {player.playerName === userName ? null : (
                  <div>
                    <OpponentView
                      stage={player.stage ? player.stage : stage}
                      userName={player.playerName}
                      socket={socket}
                    />
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
