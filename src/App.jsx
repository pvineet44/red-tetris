import React, { useEffect, useState } from "react";
import "./App.css";
import socketClient from "socket.io-client";
import { Switch, Route } from "react-router-dom";
import Tetris from "./components/Tetris";
import Welcome from "./components/Welcome";

// const SERVER = "http://localhost:" + process.env.REACT_APP_PORT;

function App() {
  const [socket, setSocket] = useState(0);

  useEffect(() => {
    setSocket(socketClient("http://localhost:5000"));
    console.log("SOCKET CONNECTED", socket);
    console.log("Port ", process.env.REACT_APP_PORT);
  }, []);

  if (!socket) return null;
  return (
    <Switch>
      <Route exact path="/game">
        <Tetris socket={socket} />
      </Route>
      <Route path="/">
        <Welcome socket={socket} />
      </Route>
    </Switch>
  );
}

export default App;
