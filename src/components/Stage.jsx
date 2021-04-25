import React from 'react';
import {
  StyledStage,
  StyledStatus,
  StyledStageContainer,
} from '../styles/StyledStage';
import Cell from './Cell';

const Stage = ({ stage, ready }) => {
  return (
    <StyledStage width={stage[0].length} height={stage.length}>
      {ready ? <StyledStatus>Ready!</StyledStatus> : null}
      {stage.map((row) =>
        row.map((cell, x) => <Cell key={x} type={cell[0]} />)
      )}
    </StyledStage>
  );
};

export default Stage;
