import React, { useEffect, useState } from 'react';
import './App.css';
import Tetris from './components/Tetris';
import socketClient from "socket.io-client";
import Username from './components/Username';
import { Switch, Route } from 'react-router-dom'

// const SERVER = "http://localhost:" + process.env.REACT_APP_PORT;

function App() {
  const [socket, setSocket] = useState(0);

  useEffect(() => {
    setSocket(socketClient("http://localhost:5000"));
    console.log("SOCKET CONNECTED", socket)
    console.log("Port ", process.env.REACT_APP_PORT)
  }, [])

  if (!socket) return null
  return (
    // <div className="App">
    //   {/* <Counter /> */}
    //   {/* <Tetris socket={socket} /> */}
    //   <Username socket={socket} />
    // </div>
    <Switch>
      <Route exact path='/game'>
        <Tetris socket={socket} />
      </Route>
      <Route path='/'>
        <Username socket={socket} />
      </Route>
    </Switch>
  );
}

export default App;
