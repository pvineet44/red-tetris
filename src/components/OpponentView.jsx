import React from 'react';
import {
  StyledOpponent,
  StyledUserName,
  StyledOpponentContainer,
} from '../styles/StyledOpponent';
import Cell from './Cell';

const OpponentView = ({ stage, userName }) => {
  return (
    <StyledOpponentContainer>
      <StyledOpponent width={stage[0].length} height={stage.length}>
        {stage.map((row) =>
          row.map((cell, x) => <Cell key={x} type={cell[0]} />)
        )}
      </StyledOpponent>
      <StyledUserName>{userName}</StyledUserName>
    </StyledOpponentContainer>
  );
};

export default OpponentView;
