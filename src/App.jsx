import React, { useEffect, useState } from 'react';
import './App.css';
import socketClient from 'socket.io-client';
import { Switch, Route } from 'react-router-dom';
import Tetris from './components/Tetris';
import Welcome from './components/Welcome';
import sfx from './assets/sound/Tetris.mp3';
import ReactHowler from 'react-howler';
import Loader from './components/Loader';
import TetrisProvider from './components/TetrisProvider';

// const SERVER = "http://localhost:" + process.env.REACT_APP_PORT;

function App() {
  const [socket, setSocket] = useState(0);
  const [soundOn, setSoundOn] = useState(false);

  const toggleSound = () => {
    setSoundOn(!soundOn);
  };

  useEffect(() => {
    setSocket(socketClient('http://localhost:5000'));
  }, []);

  const tetrisComponent = () => {
    return <Tetris socket={socket} />;
  };

  const welcomeComponent = () => {
    return (
      <Welcome socket={socket} soundOn={soundOn} toggleSound={toggleSound} />
    );
  };

  if (!socket) return null;
  return (
    <>
      {/* <ReactHowler src={sfx} loop={true} playing={true} mute={!soundOn} /> */}
      <Switch>
        <Route exact path="/:roomName[:userName]">
          {tetrisComponent()}
        </Route>
        <Route path="/">{welcomeComponent()}</Route>
      </Switch>
    </>
  );
}

export default App;
