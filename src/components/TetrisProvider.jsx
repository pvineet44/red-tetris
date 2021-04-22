import React, { useEffect, useState } from 'react';
import { StyledLoaderContainer } from '../styles/StyledLoader';
import Loader from './Loader';
import Tetris from './Tetris';
import { useParams } from 'react-router';

const TetrisProvider = (socket) => {
  const _socket = socket.socket;
  const { roomName, userName } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    _socket.emit('createOrJoin', {
      roomName: roomName,
      userName: userName,
    });
    _socket.on('Game', async (data) => {
      console.log('Game data: ', data);
    });
    setInterval(function () {
      setLoading(false);
    }, 5000);
  }, []);

  if (loading)
    return (
      <StyledLoaderContainer>
        <Loader />
      </StyledLoaderContainer>
    );
  else return <Tetris socket={socket} />;
};

export default TetrisProvider;
