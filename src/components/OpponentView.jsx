import React, { useEffect, useState } from 'react';
import {
  StyledOpponent,
  StyledUserName,
  StyledOpponentContainer,
  StyledOpponentStatus,
} from '../styles/StyledOpponent';
import Cell from './Cell';

const OpponentView = ({ stage, userName, socket }) => {
  const [dispStage, setDispStage] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    socket.socket.on('OpponentStage', async (oppStage) => {
      if(userName === oppStage.userName)
        await setDispStage(oppStage.stage)
    });

    socket.socket.on('OpponentReady', (opponentName) => {
      console.log('Opponent Ready!!', opponentName);
      if (userName === opponentName) setReady(true);
    });

    socket.socket.on('Over', (winner) => {
      console.log('over', winner);
      setReady(false);
    });
  }, []);

  return (
    <StyledOpponentContainer>
      {ready ? <StyledOpponentStatus>Ready!</StyledOpponentStatus> : null}
      <StyledOpponent width={stage[0].length} height={stage.length}>
        {dispStage.length > 0
          ? dispStage.map((row) =>
              row.map((cell, x) => <Cell key={x} type={cell[0]} />)
            )
          : stage.map((row) =>
              row.map((cell, x) => <Cell key={x} type={cell[0]} />)
            )}
      </StyledOpponent>
      <StyledUserName>{userName}</StyledUserName>
    </StyledOpponentContainer>
  );
};

export default OpponentView;
