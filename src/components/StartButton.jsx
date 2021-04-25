import React from 'react';
import { StyledButton } from '../styles/StyledStartButton';

const StartButton = ({ callback, text }) => {
  return (
    <StyledButton onClick={callback} className="learn-more" type="submit">
      {text}
    </StyledButton>
  );
};

export default StartButton;
