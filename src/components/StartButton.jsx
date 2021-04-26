import React from 'react';
import { StyledButton } from '../styles/StyledStartButton';

const StartButton = ({ callback, text, disabled }) => {
  return (
    <StyledButton
      disabled={disabled}
      onClick={callback}
      className="learn-more"
      type="submit"
    >
      {text}
    </StyledButton>
  );
};

export default StartButton;
