import { useEffect, useState } from 'react';
import { createStage } from '../gameHelpers';

export function useSocketEvent(socket, roomName, userName, setValues, setGamePlayers) {
  // const [gamePlayers, setGamePlayers] = useState([]);
  const [owner, setOwner] = useState(false);

  const updateGamePlayers = (prevGamePlayers, oppStage) => {
     prevGamePlayers.map((_player) => {
      if (_player.playerName === oppStage.userName)
      _player.stage = oppStage.stage;
    });
    return prevGamePlayers;
  };

  useEffect(() => {
    console.log('socket: ', socket);
    if (!socket) console.error('socket error');

    socket.socket.on('tetroArray', (tetroArrayServ) => {
      setValues(tetroArrayServ);
    });

    socket.socket.on('Game', async (data) => {
      console.log('game Data', data, userName, roomName);
      data.forEach((player) => {
        if (player.playerName === userName && player.isOwner) setOwner(true);
        player.stage = createStage();
      });
      await setGamePlayers(data);
    });

    // socket.socket.on('OpponentStage', async (oppStage) => {
    //   console.log('opp stage event received!')
    //     // var prev = JSON.parse(JSON.stringify(gamePlayers));

    //     // prev = updateGamePlayers(prev, oppStage);
    //     // setGamePlayers(prev);
    //   });
  }, []);
  return [owner];
}
