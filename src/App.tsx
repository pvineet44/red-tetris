import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Tetris from './components/Tetris';
import socketClient from "socket.io-client";
// const SERVER = "http://localhost:" + process.env.REACT_APP_PORT;

function App() {
  const [socket, setSocket] = useState<any>(0);

  useEffect(() => {
    setSocket(socketClient("http://localhost:5000"));
    console.log("SOCKET CONNECTED", socket)
  }, [])

  if (!socket) return null
  return (
    <div className="App">
      {/* <Counter /> */}
      <Tetris socket={socket} />
    </div>
  );
}

export default App;
