import React, { useEffect, useState } from 'react';
import {
  StyledOpponent,
  StyledUserName,
  StyledOpponentContainer,
} from '../styles/StyledOpponent';
import Cell from './Cell';

const OpponentView = ({ stage, userName, socket }) => {
  const [dispStage, setDispStage] = useState([])

  useEffect(() => {
    socket.socket.on('OpponentStage', async (oppStage) => {
      console.log("Listening", oppStage.userName, userName)
      if(userName === oppStage.userName)
        await setDispStage(oppStage.stage)
    });
  }, [])

  return (
    <StyledOpponentContainer>
      <StyledOpponent width={stage[0].length} height={stage.length}>
        {
        dispStage.length > 0 ?
        dispStage.map((row) =>
          row.map((cell, x) => <Cell key={x} type={cell[0]} />)
        )
        :
        stage.map((row) =>
          row.map((cell, x) => <Cell key={x} type={cell[0]} />)
        )}
      </StyledOpponent>
      <StyledUserName>{userName}</StyledUserName>
    </StyledOpponentContainer>
  );
};

export default OpponentView;
