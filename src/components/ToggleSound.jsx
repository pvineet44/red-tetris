import React, { useEffect, useState } from 'react';
import { StyledToggleSound } from '../styles/StyledToggleSound';

const ToggleSound = (props) => {
  const { soundOn, toggleSound } = props;
  return (
    <StyledToggleSound>
      <input
        data-testid="toggle-sound-checkbox"
        type="checkbox"
        className="toggle"
        checked={soundOn}
        onChange={toggleSound}
      />
      <div className="switch">
        <div className="inner">
          <div className="disc"></div>
        </div>
      </div>
    </StyledToggleSound>
  );
};

export default ToggleSound;
