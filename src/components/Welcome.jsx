import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';
import sfx from '../assets/sound/Tetris.mp3';

import {
  StyledWelcome,
  WelcomeFormContainer,
  Logo,
  WelcomeForm,
} from '../styles/StyledWelcome';
import tetrisLogo from '../assets/images/Tetris.png';

const Welcome = (socket) => {
  const [input, setInput] = useState('');
  const [play] = useSound(sfx);

  const handleSubmit = () => {
    console.log('input: ', input, socket);
  };

  useEffect(() => {
    // play();
  });

  return (
    <StyledWelcome>
      <WelcomeFormContainer>
        {/* <Logo></Logo> */}
        <WelcomeForm>
          <h1> Red Tetris</h1>
          <label>
            <input
              id="fname"
              type="text"
              name="inputfield"
              placeholder="Enter your name here:"
              onChange={(e) => setInput(e.target.value)}
            />
            <span>name:</span>
          </label>
          <button class="learn-more" type="submit" onClick={handleSubmit}>
            Play!
          </button>
        </WelcomeForm>
      </WelcomeFormContainer>
    </StyledWelcome>
  );
};
export default Welcome;
