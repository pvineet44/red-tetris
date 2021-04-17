import React, { useEffect, useState } from 'react';
import sfx from '../assets/sound/Tetris.mp3';

import ToggleSound from './ToggleSound';
import {
  StyledWelcome,
  WelcomeFormContainer,
  Logo,
  WelcomeForm,
} from '../styles/StyledWelcome';
import tetrisLogo from '../assets/images/Tetris.png';
import ReactHowler from 'react-howler';

const Welcome = (props) => {
  const [input, setInput] = useState('');
  const { toggleSound, socket, soundOn } = props;
  const handleSubmit = () => {
    console.log('input: ', input, socket);
  };

  return (
    <StyledWelcome>
      <ToggleSound soundOn={soundOn} toggleSound={toggleSound} />
      <WelcomeFormContainer>
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
          <button className="learn-more" type="submit" onClick={handleSubmit}>
            Play!
          </button>
        </WelcomeForm>
      </WelcomeFormContainer>
    </StyledWelcome>
  );
};
export default Welcome;
